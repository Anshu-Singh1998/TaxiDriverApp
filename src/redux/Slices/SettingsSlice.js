import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const changePassword = createAsyncThunk(
  'settings/changePassword',
  async (
    {old_password, new_password, new_password_confirmation},
    {rejectWithValue},
  ) => {
    try {
      const response = await Api.post(
        'settings/change-password', // API endpoint
        {old_password, new_password, new_password_confirmation}, // Correct format
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data; // Success response
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  },
);

export const deleteAccount = createAsyncThunk(
  'settings/deleteAccount',
  async (_, {rejectWithValue}) => {
    try {
      const id = await AsyncStorage.getItem('driver_id');
      const token = await AsyncStorage.getItem('access_token'); // Retrieve token
      console.log('Access Token:', token);

      if (!token) {
        return rejectWithValue('Authentication token is missing');
      }

      console.log('Id======>>>', id); // Get email from AsyncStorage

      if (!id) {
        return rejectWithValue('Id not found in storage');
      }

      const response = await axios.delete(
        `https://bluetaxi.varmadns.com/uat/api/settings/delete-account?id=${id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      // console.log('Delete  API Full Response:', response);
      // console.log('Delete Data:', response.data);
      await AsyncStorage.clear();
      return response.data;
      // Returns the full response (includes `message` and `data`)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const logout = createAsyncThunk(
  'settings/logout',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.post('logout');
      await AsyncStorage.clear();
      console.log("We are getting log out")
      return response.data; // Success response
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Logout failed. Please try again.',
      );
    }
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    //  change password
    builder
      .addCase(changePassword.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // delete account
    builder
      .addCase(deleteAccount.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, state => {
        state.loading = false;
        state.data = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.payload?.message || 'Failed to delete account';
      });

    // logout
    builder
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.data = null; 
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default settingsSlice.reducer;
