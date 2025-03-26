import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../Api/Api';

export const documentList = createAsyncThunk(
  'document/documentList',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Api.post('documents/fetch-all');
      console.log('Contact List Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const documentShow = createAsyncThunk(
  'document/documentShow',
  async (columnName, {rejectWithValue}) => {
    try {
      const response = await Api.post('documents/show', {
        columnName,
      });
      console.log('Documents Show Response >>>>>', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const documentSave = createAsyncThunk(
  'document/documentSave',
  async (
    rc_book,
    road_tax,
    driving_licence,
    permit,
    drivers_batch,
    {rejectWithValue},
  ) => {
    try {
      const response = await Api.post('documents/save', {
        rc_book,
        road_tax,
        driving_licence,
        permit,
        drivers_batch,
      });
      console.log('Documents Show Response >>>>>', response.data);
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
      console.log('Documents Show Response >>>>>', response.data);
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
        state.data = action.payload;
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
        state.data.push(action.payload); // append new contact
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
