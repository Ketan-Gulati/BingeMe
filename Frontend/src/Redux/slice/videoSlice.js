import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async ({ searchQuery = '', page = 1, limit = 20, sortBy = 'createdAt', sortType = 'desc' }) => {
    const res = await axios.get('/v1/videos/', {
      params: {
        searchQuery,
        page,
        limit,
        sortBy,
        sortType,
      },
    });
    return res.data.message.videos;
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        console.log("fetchVideos is pending...");
        state.loading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default videoSlice.reducer;
