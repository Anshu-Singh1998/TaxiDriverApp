import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  tripData: null,
  loading: false,
  error: null,
};

// Async thunk for posting trip data
export const postTrip = createAsyncThunk(
  'trip/postTrip',
  async (tripDetails, {rejectWithValue}) => {
    console.log('TripDetails=====>>>>', tripDetails);
    try {
      const response = await Api.post(
        'trips/accepted',
        JSON.stringify(tripDetails), // Convert to raw JSON
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Response from API:', response.data.data.id);
      const trip_id = response.data?.data.id;
      console.log('Trip====Id====>>>', trip_id);
      if (!trip_id) {
        throw new Error('Trip ID is missing in API response');
      }

      // Store trip_id in AsyncStorage
    

      return response.data;
    } catch (error) {
      console.error(
        'Error posting trip:',
        error.response?.data || error.message,
      );
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  },
);

const ridesSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postTrip.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.tripData = action.payload;
      })
      .addCase(postTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ridesSlice.reducer;
