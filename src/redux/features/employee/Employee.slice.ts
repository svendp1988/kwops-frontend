import { RetrieveRequestStatus } from "../../../types/client";
import { EmployeeState } from "./Employee.types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { State } from "../../store.types";
import { createEmployee, retrieveData } from "./Employee.actions";
import { handleRetrieveFailed, handleRetrievePending, handleRetrieveSuccess } from "../../utils/Retrieve.utils";

export const DEFAULT_STATE: EmployeeState = {
  data: [],
  isHiring: false,
  retrieveRequestError: null,
  retrieveRequestStatus: RetrieveRequestStatus.SUCCESS
};

const employeeSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(retrieveData.pending, (state) => {
      handleRetrievePending<EmployeeState>(state);
    });
    builder.addCase(retrieveData.fulfilled, (state, action) => {
      // @ts-ignore
      handleRetrieveSuccess<EmployeeState>(state, action);
    });
    builder.addCase(retrieveData.rejected, (state, action) => {
      // @ts-ignore
      handleRetrieveFailed<EmployeeState>(state, action);
    });
    builder.addCase(createEmployee.fulfilled, (state) => {
      state.isHiring = false;
    });
  },
  initialState: DEFAULT_STATE,
  name: "employee",
  reducers: {
    setIsHiring(state, action) {
      state.isHiring = action.payload;
    }
  }
});

export const { setIsHiring } = employeeSlice.actions;

const selectEmployeeState = (state: State) => state.employee;
export const selectIsHiring = createSelector(selectEmployeeState, (state: EmployeeState) => state.isHiring);
export const selectEmployeeData = createSelector(selectEmployeeState, selectIsHiring,
  (state, isHiring) => {
  return isHiring ? [...state.data, {
    editing: true,
    firstName: "",
    lastName: ""
  }] : state.data;
});
export const selectRequestStatus = createSelector(selectEmployeeState, (state: EmployeeState) => state.retrieveRequestStatus);
export const selectRequestError = createSelector(selectEmployeeState, (state: EmployeeState) => state.retrieveRequestError);

export default employeeSlice.reducer;
