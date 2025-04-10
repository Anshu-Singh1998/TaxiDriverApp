import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api/Api';

// Async Thunk to fetch trip_id and send OTP
export const sendOtp = createAsyncThunk(
  'trip/sendOtp',
  async (trip_id, {rejectWithValue}) => {
    console.log('Trip id before calling api ====>>>', trip_id);
    try {
      console.log('Trip id before calling api 12234 ====>>>', trip_id);
      if (!trip_id) {
        throw new Error('Trip ID not found');
      }

      const response = await Api.post(
        'trips/send-otp',
        {
          trip_id: trip_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Response for Otp recieving===>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const verifyTripOtp = createAsyncThunk(
  'trip/verifyOtp',
  async ({trip_id, otp}, {rejectWithValue}) => {
    console.log('Trip id for verification====>>>', trip_id);
    console.log('otp for verification=====>>>>', otp);

    try {
      const response = await Api.get(
        `trips/otp-verify?trip_id=${trip_id}&otp=${otp}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('OTP Verification Response:', response.data);

      return response.data; // Return API response data
    } catch (error) {
      console.error(
        'Error verifying OTP:',
        error.response?.data || error.message,
      );
      return rejectWithValue(error.response?.data || 'OTP verification failed');
    }
  },
);

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    trip_id: null,
    loading: false,
    sentOtp: null,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.trip = action.payload.trip;
        state.sentOtp = action.payload.otp;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyTripOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyTripOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerificationData = action.payload;
      })
      .addCase(verifyTripOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default otpSlice.reducer;
