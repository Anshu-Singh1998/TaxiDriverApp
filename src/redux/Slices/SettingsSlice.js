import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

export const changePassword = createAsyncThunk(
  'settings/changePassword',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.post('settings/change-password');
      console.log('Contact List Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteAccount = createAsyncThunk(
  'settings/deleteAccount',
  async (columnName, {rejectWithValue}) => {
    try {
      const response = await Api.post('settings/delete-account', {
        columnName,
      });
      console.log('Documents Show Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const logout = createAsyncThunk(
  'settings/logout',
  async (id, columnName, {rejectWithValue}) => {
    try {
      const response = await Api.post('logout', {
        id,
        columnName,
      });
      console.log('Documents Show Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    // Contact List
    builder
      .addCase(changePassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Contact Store
    builder
      .addCase(deleteAccount.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.data.push(action.payload); // append new contact
        state.loading = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Contact Delete
    builder
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.data = state.data.filter(item => item.id !== deletedId);
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default settingsSlice.reducer;
