import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AnalyticsApi } from "../../apis";

const defaultState = {};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default analyticsSlice;

export const getDashboard = createAsyncThunk(
  "analytics/getDashboard",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await AnalyticsApi.getDashboard();

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getRevenueByTime = createAsyncThunk(
  "analytics/getRevenueByTime",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await AnalyticsApi.getRevenueByTime(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getCustomerByTime = createAsyncThunk(
  "analytics/getCustomerByTime",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await AnalyticsApi.getCustomerByTime(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getCustomerByBook = createAsyncThunk(
  "analytics/getCustomerByBook",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await AnalyticsApi.getCustomerByBook(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
