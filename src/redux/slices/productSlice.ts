import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductApi } from "../../apis";

const defaultState = {};

const productSlice = createSlice({
  name: "product",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default productSlice;

export const findAllProducts = createAsyncThunk(
  "product/findAllProducts",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await ProductApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await ProductApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneProduct = createAsyncThunk<any, any>(
  "product/findOneProduct",
  async ({ id, query }, { rejectWithValue }) => {
    try {
      const result = await ProductApi.findOne(id, query);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await ProductApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
