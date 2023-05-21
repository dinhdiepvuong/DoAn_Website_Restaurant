import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerApi } from "../../apis";

const defaultState = {};

const customerSlice = createSlice({
  name: "customer",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default customerSlice;

export const findAllCustomers = createAsyncThunk(
  "customer/findAllCustomers",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await CustomerApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await CustomerApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneCustomer = createAsyncThunk(
  "customer/findOneCustomer",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await CustomerApi.findOne(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await CustomerApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
