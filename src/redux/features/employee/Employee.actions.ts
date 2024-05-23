import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Configuration,
  EmployeeControllerApi,
  EmployeeControllerApiAxiosParamCreator,
  EmployeeCreateDto
} from "../../../types/api";
import axios from "axios";

const createApi = () => {
  const configuration = new Configuration({ basePath: "http://localhost:8080/api" });

  return new EmployeeControllerApi(configuration);
}

export const retrieveData = createAsyncThunk(
  "RETRIEVE_DATA",
  async () => {
    const api = createApi();
    const result = await api.getAllEmployees();

    return result.data.employees;
  }
);

export const createEmployee = createAsyncThunk(
  "CREATE_EMPLOYEE",
  async (employee: EmployeeCreateDto, { dispatch }) => {
    const api = createApi();
    await api.add(employee);
    dispatch(retrieveData());
  }
);

