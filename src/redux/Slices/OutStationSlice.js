import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const outStationComplete = createAsyncThunk(
  'outStation/outStationComplete',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get('trips/outstation-complete');
      // console.log('Response====>>>', response.data.data);
      return response.data.data; // Only return the data array
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const outStationCancelled = createAsyncThunk(
  'outStation/outStationCancelled',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get('trips/outstation-cancel');
      // console.log(' Cancelled Response====>>>', response.data.data);
      return response.data.data; // Only return the data array
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const outStationUpcoming = createAsyncThunk(
  'outStation/outStationUpcoming',
  async (_, {rejectWithValue}) => {
    try {
      const email = await AsyncStorage.getItem('email_id');
      console.log('Email======>>>', email);

      if (!email) {
        return rejectWithValue('Email not found in storage');
      }

      const response = await axios.get(
        `https://bluetaxi.varmadns.com/demo/api/riderequest/upcoming-list?email=${email}&ride_type=Out-Station`,
      );

      // console.log('API Full Response:', response);
      // console.log('Ride List Data:', response.data);

      return response.data;
    } catch (error) {
      console.log("Errorr=>>>>>",error.response?.data || error.message)
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const outStationSlice = createSlice({
  name: 'outStation',
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
      .addCase(outStationComplete.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(outStationComplete.fulfilled, (state, action) => {
        state.completed = action.payload || []; // Ensure data is always an array
        state.loading = false;
      })
      .addCase(outStationComplete.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(outStationCancelled.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(outStationCancelled.fulfilled, (state, action) => {
        state.cancelled = action.payload || []; // Ensure data is always an array
        state.loading = false;
      })
      .addCase(outStationCancelled.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(outStationUpcoming.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(outStationUpcoming.fulfilled, (state, action) => {
        state.upcoming = action.payload.data;
        state.loading = false;
      })
      .addCase(outStationUpcoming.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default outStationSlice.reducer;
