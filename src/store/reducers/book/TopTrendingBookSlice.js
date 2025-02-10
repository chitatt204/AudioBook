import {createSlice} from '@reduxjs/toolkit';
import {getTopTrendingBookAPI} from '../../apis/Book';

const topTrendingBookSlice = createSlice({
  name: 'topTrendingBooks',
  initialState: {
    trendingBookData: {},
    getTrendingBookStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTopTrendingBookAPI.pending, (state, action) => {
        state.getTrendingBookStatus = 'loading';
      })
      .addCase(getTopTrendingBookAPI.fulfilled, (state, action) => {
        state.getTrendingBookStatus = 'succeeded';
        state.trendingBookData = action.payload;
      })
      .addCase(getTopTrendingBookAPI.rejected, (state, action) => {
        state.getTrendingBookStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default topTrendingBookSlice.reducer;
