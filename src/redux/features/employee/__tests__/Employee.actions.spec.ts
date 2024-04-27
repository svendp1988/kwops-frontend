import {
  callAndCheckDispatchCalls,
  getMeta, getRejectedMeta,
  getRejectedThunkResult,
  getThunkResult
} from "../../../../__tests__/utils/TestUtils";
import { createEmployee, retrieveData } from "../Employee.actions";
import { ThunkStatus } from "../../../../types/client";
import axios from "axios";
import mockSuccess from "../../../../__fixtures__/axios/success/AxiosMockAdapter";
import allEmployees from "../../../../__fixtures__/data/AllEmployees";
import mockError from "../../../../__fixtures__/axios/error/AxiosMockAdapter";
import employeeCreateDto from "../../../../__fixtures__/data/EmployeeCreateDto";

describe("Employee Actions Test Suite", () => {



  describe("retrieveData", () => {

    const BASE_CALLS  = [retrieveData.pending.type];
    const CALLS_SUCCESS = [...BASE_CALLS, retrieveData.fulfilled.type];
    const CALLS_ERROR = [...BASE_CALLS, retrieveData.rejected.type];

    test("happy path", async () => {

      mockSuccess(axios);
      const result = await callAndCheckDispatchCalls(retrieveData(), CALLS_SUCCESS);
      const expected = getThunkResult(
        getMeta(ThunkStatus.FULFILLED),
        allEmployees.employees,
        retrieveData.fulfilled.type);

      expect(result).toStrictEqual(expected);
    });

    test("on error", async () => {
      mockError(axios);
      const result = await callAndCheckDispatchCalls(retrieveData(), CALLS_ERROR);
      const expected = getRejectedThunkResult(getRejectedMeta(), retrieveData.rejected.type);

      expect(result).toStrictEqual(expected);
    });

  });

  describe("createEmployee", () => {

    const BASE_CALLS  = [createEmployee.pending.type];
    const CALLS_SUCCESS = [...BASE_CALLS, undefined, retrieveData.pending.type, createEmployee.fulfilled.type];
    const CALLS_ERROR = [...BASE_CALLS, createEmployee.rejected.type];

    test("happy path", async () => {
      mockSuccess(axios);
      const result = await callAndCheckDispatchCalls(createEmployee(employeeCreateDto), CALLS_SUCCESS);
      const expected = getThunkResult(
        getMeta(ThunkStatus.FULFILLED, employeeCreateDto),
        undefined,
        createEmployee.fulfilled.type);

      expect(result).toStrictEqual(expected);
    });

    test("on error", async () => {
      mockError(axios);
      const result = await callAndCheckDispatchCalls(createEmployee(employeeCreateDto), CALLS_ERROR);
      const expected = getRejectedThunkResult(getRejectedMeta(employeeCreateDto), createEmployee.rejected.type);

      expect(result).toStrictEqual(expected);
    });

  });

});