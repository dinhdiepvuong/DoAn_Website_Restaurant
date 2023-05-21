import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../../apis";

const defaultState = {
  isLoading: true,
  auth: {
    isLogin: false,
    user: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {
    logout: (state) => {
      state.auth = {
        isLogin: false,
        user: null,
      };
    },
  },
  extraReducers: (build) => {
    build
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        const { admin } = payload?.data;

        if (admin) {
          state.isLoading = false;
          state.auth = {
            isLogin: true,
            user: admin,
          };
        }
      })
      .addCase(findOneAdminInAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.auth = {
          isLogin: false,
          user: null,
        };
      })
      .addCase(findOneAdminInAuth.fulfilled, (state, { payload }) => {
        const { admin } = payload?.data;
        state.isLoading = false;

        if (admin) {
          state.auth = {
            isLogin: true,
            user: admin,
          };
        } else {
          state.auth = {
            isLogin: false,
            user: null,
          };
        }
      });
  },
});

export default authSlice;

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (body: any, { rejectWithValue }) => {
    try {
      const result = await AuthApi.loginAdmin(body);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const findOneAdminInAuth = createAsyncThunk(
  "auth/findOneAdminInAuth",
  async (id: any, { rejectWithValue }) => {
    try {
      const result = await AuthApi.findOneAdmin(id);

      return result;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const isLoadingAuthSelector = (state: any) => state.auth.isLoading;
export const authAuthSelector = (state: any) => state.auth.auth;
