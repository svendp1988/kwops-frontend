import { RetrieveRequestStatus } from "../../../types";
import { EmployeeState } from "./Employee.types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { State } from "../../store.types";
import { retrieveData } from "./Employee.actions";
import { handleRetrieveFailed, handleRetrievePending, handleRetrieveSuccess } from "../../utils/Retrieve.utils";

export const DEFAULT_STATE: EmployeeState = {
  data: [],
  retrieveRequestError: null,
  retrieveRequestStatus: RetrieveRequestStatus.SUCCESS
}

const employeeSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(retrieveData.pending, (state) => {
      handleRetrievePending<EmployeeState>(state)
    })
    builder.addCase(retrieveData.fulfilled, (state, action) => {
      // @ts-ignore
      handleRetrieveSuccess<EmployeeState>(state, action)
    })
    builder.addCase(retrieveData.rejected, (state, action) => {
      // @ts-ignore
      handleRetrieveFailed<EmployeeState>(state, action)
    })
  },
  initialState: DEFAULT_STATE,
  name: "employee",
  reducers: {}
});

const selectEmployeeState = (state: State) => state.employee;
export const selectEmployeeData = createSelector(selectEmployeeState, (state: EmployeeState) => state.data);

export default employeeSlice.reducer;
