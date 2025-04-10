import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../Api/Api';


export const startTripKM = createAsyncThunk(
  'trip/startTripKM',
  async ({ id, start_km }, { rejectWithValue }) => {
    try {
      const response = await Api.post(
        'trips/start-km',
        { id, start_km },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Response of submitting the km =====>>>",response.data)
      return response.data;
    } catch (error) {
      console.error('Start KM error:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const kilometerSlice = createSlice({
  name: 'kilometer',
  initialState: {
    loading: false,
    startKmData: null,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(startTripKM.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startTripKM.fulfilled, (state, action) => {
        state.loading = false;
        state.startKmData = action.payload;
      })
      .addCase(startTripKM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kilometerSlice.reducer;
