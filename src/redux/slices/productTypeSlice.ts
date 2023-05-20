import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductTypeApi } from "../../apis";

const defaultState = {};

const productTypeSlice = createSlice({
  name: "productType",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default productTypeSlice;

export const findAllProductTypes = createAsyncThunk(
  "productType/findAllProductTypes",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await ProductTypeApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createProductType = createAsyncThunk(
  "productType/createProductType",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await ProductTypeApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneProductType = createAsyncThunk(
  "productType/findOneProductType",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await ProductTypeApi.findOne(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductType = createAsyncThunk(
  "productType/updateProductType",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await ProductTypeApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
