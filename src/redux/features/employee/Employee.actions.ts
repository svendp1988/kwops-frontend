import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration, EmployeeControllerApi } from "../../../types/api";

const createApi = () => {
  const configuration = new Configuration({ basePath: "http://localhost:8083/api" });

  return new EmployeeControllerApi(configuration);
}

export const retrieveData = createAsyncThunk(
  "RETRIEVE_DATA",
  async () => {
    const api = createApi();
    const result = await api.getAllEmployees();

    return result.data;
  }
);

