import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DrinkApi } from "../../apis";

const defaultState = {};

const drinkSlice = createSlice({
  name: "drink",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default drinkSlice;

export const findAllDrinks = createAsyncThunk(
  "drink/findAllDrinks",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await DrinkApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createDrink = createAsyncThunk(
  "drink/createDrink",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await DrinkApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneDrink = createAsyncThunk(
  "drink/findOneDrink",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await DrinkApi.findOne(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDrink = createAsyncThunk(
  "drink/updateDrink",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await DrinkApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
