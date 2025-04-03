import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api/Api';
import axios from 'axios';

export const tollRequestList = createAsyncThunk(
  'tollrequest/walletList',
  async (_, {rejectWithValue}) => {
    try {
      const email = await AsyncStorage.getItem('email_id');
      const id = await AsyncStorage.getItem('driver_id');
      console.log('Email======>>>', email);
      console.log('Id======>>>', id); // Get email from AsyncStorage

      if (!email) {
        return rejectWithValue('Email not found in storage');
      }

      const response = await axios.get(
        `https://bluetaxi.varmadns.com/demo/api/wallet/toll-requests/list?email=${email}&id=${id}`,
      );

      // console.log('toll API Full Response:', response);
      // console.log('toll List Data:', response.data);

      return response.data; // Returns the full response (includes `message` and `data`)
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
      return response.data.data;
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
        state.data = action.payload.data;
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
