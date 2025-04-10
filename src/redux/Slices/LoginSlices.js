// src/redux/slices/loginSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email, password}, {rejectWithValue}) => {
    console.log("Email===>>>", email,"password===>>",password)
    try {
      const response = await axios.post('https://bluetaxi.varmadns.com/uat/api/login', {email, password});
      // console.log(response.data);
      await AsyncStorage.setItem('access_token', response.data.access_token);
      await AsyncStorage.setItem('driver_id', response.data.user.id.toString());
      await AsyncStorage.setItem('email_id', response.data.user.email);
      await AsyncStorage.setItem('user_name', response.data.user.name);
      console.log("Response login====>>",response.data.user)
      return response.data;
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong',
      );
    }
  },
);

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = loginSlice.actions;
export default loginSlice.reducer;
