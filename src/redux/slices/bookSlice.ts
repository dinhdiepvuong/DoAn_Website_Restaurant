import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookApi } from "../../apis";

const defaultState = {};

const bookSlice = createSlice({
  name: "book",
  initialState: defaultState,
  reducers: {},
  extraReducers: {},
});

export default bookSlice;

export const findAllBooks = createAsyncThunk(
  "book/findAllBooks",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await BookApi.find(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findAllBooksForOrder = createAsyncThunk(
  "book/findAllBooksForOrder",
  async (params: any, { rejectWithValue }) => {
    try {
      const result = await BookApi.findAllBooksForOrder(params);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createBook = createAsyncThunk(
  "book/createBook",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await BookApi.create(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneBook = createAsyncThunk(
  "book/findOneBook",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await BookApi.findOne(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await BookApi.update(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findFoodsAndTablesByBook = createAsyncThunk(
  "book/findFoodsAndTablesByBook",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await BookApi.findFoodsAndTablesByBook(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFoodInBook = createAsyncThunk(
  "book/updateFoodInBook",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await BookApi.updateFoodInBook(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findTablesForBook = createAsyncThunk(
  "book/findTablesForBook",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await BookApi.findTablesForBook(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
