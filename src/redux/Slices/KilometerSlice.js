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


export const endTripKM = createAsyncThunk(
  'trip/endTripKM',
  async ({ id, end_km }, { rejectWithValue }) => {
    try {
      const response = await Api.post(
        'trips/end-km',
        { id, end_km },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Response of submitting end km the km =====>>>",response)
      return response.data;
    } catch (error) {
      console.error('End KM error:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const kilometerSlice = createSlice({
  name: 'kilometer',
  initialState: {
    loading: false,
    startKmData: null,
    endKmData:null,
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
      })
      .addCase(endTripKM.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endTripKM.fulfilled, (state, action) => {
        state.loading = false;
        state.endKmData = action.payload;
      })
      .addCase(endTripKM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kilometerSlice.reducer;
