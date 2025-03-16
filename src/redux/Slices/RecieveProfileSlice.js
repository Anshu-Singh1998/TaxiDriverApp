import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api/Api';

/**
 * Async thunk to fetch profile data from the server.
 */
export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get('profile/fetch');
      console.log('Profile Fetch Response:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Async thunk to update profile data on the server.
 */
export const updateProfileData = createAsyncThunk(
  'profile/updateProfileData',
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await Api.put('profile/update', updatedData);
      console.log('Profile Update Response:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Initial state of the profile slice.
 */
const initialState = {
  data: null,

  fetchLoading: false,
  updateLoading: false,

  fetchError: null,
  updateError: null,

  successMessage: null,
};

/**
 * Profile slice using Redux Toolkit.
 */
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Optional: Reset messages if needed
    clearProfileMessages: state => {
      state.fetchError = null;
      state.updateError = null;
      state.successMessage = null;
    },
  },
  extraReducers: builder => {
    // === FETCH PROFILE ===
    builder
      .addCase(fetchProfileData.pending, state => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      });

    // === UPDATE PROFILE ===
    builder
      .addCase(updateProfileData.pending, state => {
        state.updateLoading = true;
        state.updateError = null;
        state.successMessage = null;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.data = action.payload; // update the local data with updated response
        state.successMessage = 'Profile updated successfully!';
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearProfileMessages } = profileSlice.actions;

export default profileSlice.reducer;
