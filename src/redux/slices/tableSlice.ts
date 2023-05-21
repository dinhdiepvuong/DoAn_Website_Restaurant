import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TableApi } from "../../apis";

const defaultState = {};

const tableSlice = createSlice({
  name: "table",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default tableSlice;

export const findAllTables = createAsyncThunk(
  "table/findAllTables",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await TableApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createTable = createAsyncThunk(
  "table/createTable",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await TableApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createMultiTable = createAsyncThunk(
  "table/createMultiTable",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await TableApi.createMulti(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneTable = createAsyncThunk(
  "table/findOneTable",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await TableApi.findOne(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await TableApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
