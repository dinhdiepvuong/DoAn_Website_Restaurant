import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EmployeeApi } from "../../apis/employee";

const defaultState = {};

const employeeSlice = createSlice({
  name: "employee",
  initialState: defaultState,
  reducers: {},
});

export default employeeSlice;

export const findAllEmployees = createAsyncThunk(
  "customer/findAllEmployees",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await EmployeeApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "customer/createEmployee",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await EmployeeApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneEmployee = createAsyncThunk(
  "customer/findOneEmployee",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await EmployeeApi.findOne(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "customer/updateEmployee",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await EmployeeApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
