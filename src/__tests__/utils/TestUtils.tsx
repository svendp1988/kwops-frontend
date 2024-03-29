import { AppDispatch, AppStore, RootState } from "../../redux/store";
import { configureStore } from "@reduxjs/toolkit";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { render, renderHook, RenderOptions } from "@testing-library/react";


export const callAndCheckDispatchCalls = async (callback: (dispatch: AppDispatch, getState: () => RootState) => Promise<void>, dispatchCalls: string [], state = {}) => {
    const getState = () => state;
    const dispatch = jest.fn().mockImplementation((action) => {
        if (!action.type && typeof action === "function") {
            action(dispatch, getState);
        }
    });
    const result = await callback(dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(dispatchCalls.length);
    dispatch.mock.calls.forEach((call, index) => expect(call[0].type).toBe(dispatchCalls[index]));

    return result;
};


const configureTestStore = (initialState?: Partial<RootState>) => configureStore({
    preloadedState: initialState,
    reducer: {}
});

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureTestStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>;
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderHookWithProviders<
    Result,
    Props>(
    render: (initialProps: Props) => Result,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureTestStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>;
    }

    return { store, ...renderHook(render, { wrapper: Wrapper, ...renderOptions }) };
}

export const addFormSupport = (data: Map<string, string>) => ({
    ...(document.createElement("form")),
    elements: { namedItem: jest.fn((key) => ({ value: data.get(key) })) }
} as unknown as HTMLFormElement);
