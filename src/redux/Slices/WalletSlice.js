// src/redux/slices/statusSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

// 🔄 Async Thunk: Fetch Wallet List based on Email
export const walletList = createAsyncThunk(
  'wallet/walletList',
  async (email, {rejectWithValue}) => {
    try {
      const response = await Api.post('wallet/list', {email: email});
      console.log('Wallet List Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const walletListDetails = createAsyncThunk(
  'wallet/walletListDetails',
  async (email, {rejectWithValue}) => {
    try {
      const response = await Api.post('wallet/detail', {email: email});
      console.log('Wallet List Details Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const walletTollSave = createAsyncThunk(
  'wallet/walletTollSave',
  async (email, ride_id, toll_amount, {rejectWithValue}) => {
    try {
      const response = await Api.post('wallet/save', {
        email: email,
        ride_id: ride_id,
        toll_amount: toll_amount,
      });
      console.log('Wallet Toll Request Save Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// 📦 Slice
const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    data: [], // Wallet list data
    loading: false, // Loading state
    error: null, // Error message if any
  },
  reducers: {
    // You can add synchronous reducers here if needed in future
  },
  extraReducers: builder => {
    builder
      .addCase(walletList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(walletList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(walletList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(walletListDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(walletListDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(walletListDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(walletTollSave.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(walletTollSave.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(walletTollSave.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default walletSlice.reducer;
