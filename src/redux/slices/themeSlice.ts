import { createSlice } from "@reduxjs/toolkit";
import { SIDE_BAR_MODE } from "../../utils";

export default createSlice({
  name: "theme",
  initialState: {
    theme: "light",
    toast: {
      content: "",
      type: "success",
    },
    backdrop: {
      isShow: false,
      content: "",
    },
    sidebarMode: 0,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    showToast: (state, action) => {
      state.toast = action.payload;
    },
    showBackdrop: (state, action) => {
      state.backdrop = action.payload;
    },
    hideBackdrop: (state, action) => {
      state.backdrop = action.payload;
    },
    updateSidebarMode: (state, { payload }) => {
      state.sidebarMode = payload;
    },
  },
});

export const themeSelector = (state: any) => state.theme.theme;
export const toastSelector = (state: any) => state.theme.toast;
export const backdropSelector = (state: any) => state.theme.backdrop;
export const sidebarModeSelector = (state: any) => state.theme.sidebarMode;
