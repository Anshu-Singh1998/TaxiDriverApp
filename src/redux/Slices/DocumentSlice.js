import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

export const documentList = createAsyncThunk(
  'document/documentList',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get('documents/fetch-all');
      console.log('Document Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error for documents all:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const documentShow = createAsyncThunk(
  'document/documentShow',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.get(`documents/show?columnName=rc_book`);

      // console.log('API Full Response:', response);
      console.log('Ride List Data:', response.data);
      console.log('Documents Show Response >>>>>', response.data);

      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const documentSave = createAsyncThunk(
  'document/documentSave',
  async (formData, {rejectWithValue}) => {
    try {
      const response = await Api.post('documents/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Documents Save Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);



export const documentDownload = createAsyncThunk(
  'document/documentDownload',
  async (id, columnName, {rejectWithValue}) => {
    try {
      const response = await Api.post('documents/download', {
        id,
        columnName,
      });
      console.log('Documents Download Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    // Contact List
    builder
      .addCase(documentList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(documentList.fulfilled, (state, action) => {
        console.log('API Response in Redux:', action.payload);
        state.data = Array.isArray(action.payload.data)
          ? action.payload.data
          : [action.payload.data];
        state.loading = false;
      })

      .addCase(documentList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Contact Store
    builder
      .addCase(documentShow.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(documentShow.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data = [...state.data, action.payload]; // Merge new data
        } else {
          state.data = [action.payload]; // Initialize if empty
        }
        state.loading = false;
      })

      .addCase(documentShow.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Contact Delete
    builder
      .addCase(documentSave.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(documentSave.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.data = state.data.filter(item => item.id !== deletedId);
        state.loading = false;
      })
      .addCase(documentSave.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Contact Delete
    builder
      .addCase(documentDownload.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(documentDownload.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.data = state.data.filter(item => item.id !== deletedId);
        state.loading = false;
      })
      .addCase(documentDownload.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default documentSlice.reducer;
