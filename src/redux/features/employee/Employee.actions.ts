import { createAsyncThunk } from "@reduxjs/toolkit";
import { add, getAllEmployees } from "../../../../orval";
import { EmployeeCreateDto } from "../../../../orval.schemas";
import type { AxiosRequestConfig } from "axios";



export const retrieveData = createAsyncThunk(
  "RETRIEVE_DATA",
  async () => {
    const options: AxiosRequestConfig = {
      baseURL: 'http://localhost:8080/api'
    }
    const result = await getAllEmployees(options);

    return result.data.employees;
  }
);

export const createEmployee = createAsyncThunk(
  "CREATE_EMPLOYEE",
  async (employee: EmployeeCreateDto, { dispatch }) => {
    await add(employee);
    dispatch(retrieveData());
  }
);

