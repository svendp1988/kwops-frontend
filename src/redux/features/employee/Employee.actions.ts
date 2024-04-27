import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration, EmployeeControllerApi, EmployeeCreateDto } from "../../../types/api";

const createApi = () => {
  const configuration = new Configuration({ basePath: "https://kwops-1eec53f28fce.herokuapp.com/api" });

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

