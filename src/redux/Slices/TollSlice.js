import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

export const tollRequestList = createAsyncThunk(
  'tollrequest/walletList',
  async (email, id, {rejectWithValue}) => {
    try {
      const response = await Api.post('wallet/toll-requests/list', {
        email: email,
        id: id,
      });
      console.log('Wallet List Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const tollRequestUpdate = createAsyncThunk(
  'tollrequest/walletListDetails',
  async (status, id, {rejectWithValue}) => {
    try {
      const response = await Api.post('wallet/toll-requests/update', {
        status: status,
        id: id,
      });
      console.log('Wallet List Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// 📦 Slice
const tollRequestSlice = createSlice({
  name: 'tollrequest',
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
      .addCase(tollRequestList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tollRequestList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(tollRequestList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(tollRequestUpdate.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tollRequestUpdate.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(tollRequestUpdate.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default tollRequestSlice.reducer;
