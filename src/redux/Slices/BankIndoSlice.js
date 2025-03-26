import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

export const bankInfoList = createAsyncThunk(
  'bankInfo/bankInfoList',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get('bank-info/fetch');
      console.log('Contact List Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const bankInfoStore = createAsyncThunk(
  'bankInfo/bankInfoStore',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await Api.post('bank-info/store', payload);
      console.log('Bank Info Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const bankInfoUpdate = createAsyncThunk(
  'bankInfo/bankInfoUpdate',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Api.put('bank-info/update', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const bankInfoSlice = createSlice({
  name: 'bankInfo',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    // Bank Info List
    builder
      .addCase(bankInfoList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bankInfoList.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(bankInfoList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Bank Info Save
    builder
      .addCase(bankInfoStore.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bankInfoStore.fulfilled, (state, action) => {
        state.data = action.payload.data; // append new contact
        state.loading = false;
      })
      .addCase(bankInfoStore.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Bank Info Update
    builder
      .addCase(bankInfoUpdate.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bankInfoUpdate.fulfilled, (state, action) => {
        state.data = action.payload.data; // Replace the old object with updated data
        state.loading = false;
      })
      
      .addCase(bankInfoUpdate.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default bankInfoSlice.reducer;
