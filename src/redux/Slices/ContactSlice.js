import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

// === Async Thunks ===

// Fetch contact list from API
export const contactList = createAsyncThunk(
  'contact/contactList',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get('emergency-contacts/list');
      console.log('Contacts from API:', response.data); // Debugging

      if (!response.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid data format received');
      }

      return response.data.data; // Return only contacts array
    } catch (error) {
      console.error('Fetch Error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || {message: 'Failed to fetch contacts'},
      );
    }
  },
);

// Store a new contact in the API
export const contactStore = createAsyncThunk(
  'contact/contactStore',
  async ({name, phone_number}, {rejectWithValue}) => {
    try {
      // Remove non-numeric characters
      const cleanedPhoneNumber = phone_number.replace(/\D/g, '');

      console.log('Sending Contact Data:', {
        name,
        phone_number: cleanedPhoneNumber,
      });

      const response = await Api.post('emergency-contacts/store', {
        name,
        phone_number: cleanedPhoneNumber, // Send only numeric value
      });

      console.log('Contact Store Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'Contact Store Error >>>>>',
        error.response?.data || error.message,
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Delete a contact from the API
export const contactDelete = createAsyncThunk(
  'contact/contactDelete',
  async (id, {rejectWithValue}) => {
    console.log("Id====>>>",id)
    try {
      const response = await Api.delete(`emergency-contacts/delete/${id}`);
      console.log('Contact Deleted:', response.data);
      return id; // Returning deleted contact ID to update state
    } catch (error) {
      console.log(
        'Delete Contact Error >>>',
        error.response?.data || error.message,
      );
      return rejectWithValue(
        error.response?.data || {message: 'Something went wrong'},
      );
    }
  },
);

// === Slice ===
const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Contact List
      .addCase(contactList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(contactList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(contactList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Contact Store
      .addCase(contactStore.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(contactStore.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(contactStore.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Contact Delete
      .addCase(contactDelete.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(contactDelete.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.user_id !== action.payload,
        );
      })
      .addCase(contactDelete.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to delete contact';
      });
  },
});

export default contactSlice.reducer;
