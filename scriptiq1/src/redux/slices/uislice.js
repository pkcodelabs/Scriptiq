// src/redux/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { loading: false },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setLoading, clearLoading } = uiSlice.actions;
export const selectLoading = (state) => state.ui.loading;
export default uiSlice.reducer;
