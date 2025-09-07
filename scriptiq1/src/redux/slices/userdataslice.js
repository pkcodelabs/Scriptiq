import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { baseUrl } from "../../utils/endpoints"; // optional, fallback URL

// --- Generic Axios instance inside thunk ---

// Async thunk to fetch call data
export const fetchCallData = createAsyncThunk(
  "user/fetchCallData",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const token =
        localStorage.getItem("access_token") || localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));

      if (!userData?.email) {
        return rejectWithValue("No user email found");
      }

      // Axios request
      const response = await axios.post(
        `${baseUrl}/callme`,
        { email: userData.email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          timeout: 30000, // 30s timeout
        }
      );

      return response.data; // {status, message, user}
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "API request failed"
      );
    }
  }
);

const initialState = {
  callData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearCallData: (state) => {
      state.callData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCallData.pending, (state) => {
        console.log("lof");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCallData.fulfilled, (state, action) => {
        state.loading = false;
        state.callData = action.payload;
      })
      .addCase(fetchCallData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCallData } = userSlice.actions;

// Selectors
export const selectCallData = (state) => state.user.callData;
export const selectCallLoading = (state) => state.user.loading;
export const selectCallError = (state) => state.user.error;

export default userSlice.reducer;
