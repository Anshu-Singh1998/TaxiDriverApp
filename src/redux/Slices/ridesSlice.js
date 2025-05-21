import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  tripData: null,
  ongoingTrips: [],
  completed: [],
  cancelled: [],
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

      console.log('Response of accept api =====>>>>', response.data);

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

export const fetchOngoingTrips = createAsyncThunk(
  'trip/fetchOngoingTrips',
  async (_, thunkAPI) => {
    try {
      const response = await Api.get('trips/ongoing');
      // console.log('Response dataaa====>>>', response.data.data);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchCompletedTrips = createAsyncThunk(
  'trip/fetchCompletedTrips',
  async ({trip_id}, thunkAPI) => {
    console.log("Trip if for trip complete====>>>",trip_id)
    try {
      const response = await Api.post('trips/complete',{trip_id});
      console.log('Response dataaa for trip complete====>>>', response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchCancelledTrips = createAsyncThunk(
  'trip/fetchCancelledTrips',
  async ({ trip_id, cancel_type, cancel_reason }, thunkAPI) => {
    try {
      const response = await Api.post('trips/cancel', {
        trip_id,
        cancel_type,
        cancel_reason,
      });
      console.log('Response dataaa for trip cancel====>>>', response.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const markTripArrived = createAsyncThunk(
  'trip/markTripArrived',
  async (tripId, thunkAPI) => {
    console.log('Trip id before arrived api gets hit ====>>>', tripId);
    try {
      const response = await Api.get(`trips/arrived?id=${tripId}`);
      console.log('Response of arrived api =====>>>>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
      })
      .addCase(fetchOngoingTrips.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOngoingTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.ongoingTrips = action.payload;
      })
      .addCase(fetchOngoingTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCompletedTrips.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.completed = action.payload;
      })
      .addCase(fetchCompletedTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCancelledTrips.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCancelledTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.cancelled = action.payload;
      })
      .addCase(fetchCancelledTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markTripArrived.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markTripArrived.fulfilled, (state, action) => {
        state.loading = false;
        state.arrived = action.payload;
      })
      .addCase(markTripArrived.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ridesSlice.reducer;
