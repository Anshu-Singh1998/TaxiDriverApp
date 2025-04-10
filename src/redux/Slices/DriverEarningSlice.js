import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

const initialState = {
  driverearned: [],
  driverhours: {},
  loading: false,
  error: null,
};

export const fetchDriverEarnings = createAsyncThunk(
  'driverearnings/fetchDriverEarnings',
  async (_, thunkAPI) => {
    try {
      const response = await Api.get('driver/earnings-summary');
      console.log('Response earnings-summary dataaa====>>>', response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchDriverHours = createAsyncThunk(
  'driverearnings/fetchDriverHours',
  async (_, thunkAPI) => {
    try {
      const response = await Api.get('driver/log-hours');
      console.log('Response login-hours dataaa====>>>', response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const DriverEarningsSlice = createSlice({
  name: 'driverearnings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(fetchDriverEarnings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.driverearned = action.payload;
      })
      .addCase(fetchDriverEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDriverHours.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverHours.fulfilled, (state, action) => {
        state.loading = false;
        state.driverhours = action.payload;
      })
      .addCase(fetchDriverHours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default DriverEarningsSlice.reducer;
