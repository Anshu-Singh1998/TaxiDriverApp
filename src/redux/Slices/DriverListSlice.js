import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Async thunk for fetching driver ride list
export const driverRideList = createAsyncThunk(
  'driver/driverRideList',
  async (_, {rejectWithValue}) => {
    try {
      const email = await AsyncStorage.getItem('email_id');
      console.log('Email======>>>', email); // Get email from AsyncStorage

      if (!email) {
        return rejectWithValue('Email not found in storage');
      }

      const response = await axios.get(
        `https://bluetaxi.varmadns.com/demo/api/riderequest/list?email=${email}`,
      );

      // console.log('API Full Response:', response);
      // console.log('Ride List Data:', response.data);

      return response.data; // Returns the full response (includes `message` and `data`)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Redux slice
const driverListSlice = createSlice({
  name: 'driver',
  initialState: {
    data: [], // Stores only the rides array
    message: '', // Stores success message
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(driverRideList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(driverRideList.fulfilled, (state, action) => {
        // console.log('Full API Response in Redux:', action.payload);
        state.data = action.payload.data || []; // Store ride list
        state.message = action.payload.message || 'Success';
        state.loading = false;
      })
      .addCase(driverRideList.rejected, (state, action) => {
        state.error =
          action.payload?.message || action.payload || 'Something went wrong!';
        state.loading = false;
      });
  },
});

export default driverListSlice.reducer;
