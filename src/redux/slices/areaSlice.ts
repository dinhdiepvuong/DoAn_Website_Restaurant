import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AreaApi } from "../../apis";

const defaultState = {};

const areaSlice = createSlice({
  name: "area",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default areaSlice;

export const findAllAreas = createAsyncThunk(
  "area/findAllAreas",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await AreaApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createArea = createAsyncThunk(
  "area/createArea",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await AreaApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneArea = createAsyncThunk(
  "area/findOneArea",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await AreaApi.findOne(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateArea = createAsyncThunk(
  "area/updateArea",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await AreaApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
