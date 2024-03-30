import { configureStore } from "@reduxjs/toolkit";
import { State } from "./store.types";
import { DEFAULT_STATE as DEFAULT_EMPLOYEE_STATE } from "./features/employee/Employee.slice";
import employeeReducer from "./features/employee/Employee.slice";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    employee: employeeReducer
  }
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const initialState: State = {
  employee: DEFAULT_EMPLOYEE_STATE
};
