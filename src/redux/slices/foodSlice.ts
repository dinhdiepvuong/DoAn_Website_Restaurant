import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FoodApi } from "../../apis";

const defaultState = {};

const foodSlice = createSlice({
  name: "food",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default foodSlice;

export const findAllFoods = createAsyncThunk(
  "food/findAllFoods",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await FoodApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createFood = createAsyncThunk(
  "food/createFood",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await FoodApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneFood = createAsyncThunk(
  "food/findOneFood",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await FoodApi.findOne(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFood = createAsyncThunk(
  "food/updateFood",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await FoodApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
