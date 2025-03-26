import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

export const driverRideList = createAsyncThunk(
  'driver/driverRideList',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get(
        'https://bluetaxi.varmadns.com/demo/api/riderequest/list',
      );
      console.log('Contact List Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const driverListSlice = createSlice({
  name: 'driver',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    // Bank Info List
    builder
      .addCase(driverRideList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(driverRideList.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(driverRideList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default driverListSlice.reducer;
