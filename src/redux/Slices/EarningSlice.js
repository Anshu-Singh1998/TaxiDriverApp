import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import moment from 'moment';
import Api from '../../Api/Api';
import axios from 'axios';


export const fetchToday = createAsyncThunk(
  'earning/fetchToday',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get('driver/earnings/today-report');
      console.log('Response of today earning =====>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchWeekly = createAsyncThunk(
  'earning/fetchWeekly',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get(`driver/earnings/weekly-report`);
      console.log('Response of weekly earning =====>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchReport = createAsyncThunk(
  'earning/fetchReport',
  async ({from_date, to_date}, {rejectWithValue}) => {
    console.log('From DATe=====>>>', from_date, to_date);
    try {
      const response = await Api.get(
        `driver/earnings/range-report?from_date=${from_date}&to_date=${to_date}`,
      );
      console.log('Reponse for report====>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const earningSlice = createSlice({
  name: 'earning',
  initialState: {
    today: [],
    weekly: [],
    report: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // TODAY
      .addCase(fetchToday.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToday.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload;
      })
      .addCase(fetchToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // WEEKLY
      .addCase(fetchWeekly.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeekly.fulfilled, (state, action) => {
        state.loading = false;
        state.weekly = action.payload;
      })
      .addCase(fetchWeekly.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // REPORT
      .addCase(fetchReport.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default earningSlice.reducer;
