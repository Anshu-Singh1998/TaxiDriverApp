// src/redux/slices/statusSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api/Api';

// 🔄 Async Thunk: Change Status API Call
export const changeDriverStatus = createAsyncThunk(
  'status/changeDriverStatus',
  async (newStatus, { rejectWithValue }) => {
    try {
      const response = await Api.post('change-status', { status: newStatus });
      // console.log("Status=====>>>>",response.data.user.status)
      return response.data.user.status; // returns 'online' or 'offline'
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const statusSlice = createSlice({
  name: 'status',
  initialState: {
    status: 'offline',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeDriverStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeDriverStatus.fulfilled, (state, action) => {
        state.status = action.payload;
        state.loading = false;
      })
      .addCase(changeDriverStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default statusSlice.reducer;
