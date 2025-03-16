// src/redux/slices/loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await Api.post('login', { email, password });
      console.log(response.data)
      await AsyncStorage.setItem('access_token', response.data.access_token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
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

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
