import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api/Api';



export const checkAvailability = createAsyncThunk(
  'trips/checkAvailability',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get('trips/availability');
      console.log("Response for avaibility====>>",response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error checking availability');
    }
  }
);


const AvailabilitySlice = createSlice({
  name: 'tripAvailability',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(checkAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AvailabilitySlice.reducer;
