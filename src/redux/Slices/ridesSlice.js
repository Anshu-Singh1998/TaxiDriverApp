// src/redux/slices/ridesSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

const COMPLETE_API = 'trips/complete';
const CANCEL_API = 'trips/cancel';

// Fetch Complete Trips
export const fetchCompleteTrips = createAsyncThunk(
  'rides/fetchCompleteTrips',
  async (payload, thunkAPI) => {
    try {
      const response = await Api.post(COMPLETE_API, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch Cancelled Trips
export const fetchCancelledTrips = createAsyncThunk(
  'rides/fetchCancelledTrips',
  async (payload, thunkAPI) => {
    try {
      const response = await Api.post(CANCEL_API, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const ridesSlice = createSlice({
  name: 'rides',
  initialState: {
    completeRides: [],
    cancelledRides: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Complete Rides
      .addCase(fetchCompleteTrips.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompleteTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.completeRides = action.payload?.data || [];
      })
      .addCase(fetchCompleteTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancelled Rides
      .addCase(fetchCancelledTrips.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCancelledTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.cancelledRides = action.payload?.data || [];
      })
      .addCase(fetchCancelledTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ridesSlice.reducer;
