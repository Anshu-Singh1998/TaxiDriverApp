import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const localComplete = createAsyncThunk(
  'outStation/outStationComplete',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get('trips/local-complete');
      // console.log('Response====>>>', response.data.data);
      return response.data.data; // Only return the data array
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const localCancelled = createAsyncThunk(
  'local/outStationCancelled',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get('trips/local-cancel');
      // console.log(' Cancelled Response====>>>', response.data.data);
      return response.data.data; // Only return the data array
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const localUpcoming = createAsyncThunk(
  'local/localUpcoming',
  async (_, {rejectWithValue}) => {
    try {
      const email = await AsyncStorage.getItem('email_id');
      console.log('Email======>>>', email);

      if (!email) {
        return rejectWithValue('Email not found in storage');
      }

      const response = await axios.get(
        `https://bluetaxi.varmadns.com/demo/api/riderequest/list?email=${email}&ride_type=Local`,
      );

      // console.log('API Full Response:', response);
      // console.log('Ride List Data:', response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const localRideSlice = createSlice({
  name: 'local',
  initialState: {
    completed: [],
    cancelled: [],
    upcoming: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(localComplete.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localComplete.fulfilled, (state, action) => {
        state.completed = action.payload || []; // Ensure data is always an array
        state.loading = false;
      })
      .addCase(localComplete.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(localCancelled.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localCancelled.fulfilled, (state, action) => {
        state.cancelled = action.payload || []; // Ensure data is always an array
        state.loading = false;
      })
      .addCase(localCancelled.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(localUpcoming.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localUpcoming.fulfilled, (state, action) => {
        state.upcoming = action.payload.data;
        state.loading = false;
      })
      .addCase(localUpcoming.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default localRideSlice.reducer;
