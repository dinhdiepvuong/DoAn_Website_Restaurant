import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderApi } from "../../apis";

const defaultState = {};

const areaSlice = createSlice({
  name: "area",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default areaSlice;

export const findAllOrders = createAsyncThunk(
  "area/findAllOrders",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await OrderApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createOrder = createAsyncThunk(
  "area/createOrder",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await OrderApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneOrder = createAsyncThunk(
  "area/findOneOrder",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await OrderApi.findOne(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "area/updateOrder",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await OrderApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
