import { AppDispatch, AppStore, initialState, RootState } from "../../redux/store";
import { AsyncThunk, AsyncThunkAction, configureStore } from "@reduxjs/toolkit";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { render, renderHook, RenderOptions } from "@testing-library/react";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { EmployeeDetailsDto } from "../../types/api";
import { ThunkStatus } from "../../types/client";
import { AxiosError } from "axios";


export const callAndCheckDispatchCalls = async (callback: AsyncThunkAction<unknown, unknown, AsyncThunkConfig>, dispatchCalls: string[], state = initialState) => {
    const getState = () => state;
    const dispatch = jest.fn().mockImplementation((action) => {
        if (!action.type && typeof action === "function") {
            action(dispatch, getState);
        }
    });
    const result = await callback(dispatch, getState, undefined);
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

interface Meta {
    requestId: any;
    arg: unknown;
    requestStatus: ThunkStatus;
}

interface RejectedMeta extends Meta {
    aborted: boolean;
    condition: boolean;
    rejectedWithValue: boolean;
}

export const getMeta = (requestStatus: ThunkStatus, arg?: unknown): Meta => ({
    arg,
    requestId: expect.any(String),
    requestStatus
});

export const getRejectedMeta = (arg? :unknown, rejectedWithValue: boolean = false, aborted: boolean = false, condition: boolean = false): RejectedMeta => ({
    ...getMeta(ThunkStatus.REJECTED, arg),
    aborted,
    condition,
    rejectedWithValue
})

interface ThunkResult {
    meta: Meta;
    payload: unknown;
    type: string;
}

interface ThunkError {
    name: string;
    message: string;
    stack: string;
}

interface RejectedThunkResult extends ThunkResult {
    meta: RejectedMeta;
    error: ThunkError;
}

export const getThunkResult = (meta: Meta, payload: unknown, type: string): ThunkResult => ({
    meta,
    payload,
    type
});

const DEFAULT_ERROR: ThunkError = {
    message: "Network Error",
    name: "Error",
    stack: expect.any(String)
};

export const getRejectedThunkResult = (meta: RejectedMeta, type: string, payload?: unknown, error: ThunkError = DEFAULT_ERROR): RejectedThunkResult => ({
    error,
    meta,
    payload,
    type
});