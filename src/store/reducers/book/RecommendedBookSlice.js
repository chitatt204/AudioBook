import {createSlice} from '@reduxjs/toolkit';
import {getRecommendedBooksAPI} from '../../apis/Book';

const recommendedBookSlice = createSlice({
  name: 'recommendedBooks',
  initialState: {
    recommendedBookData: {},
    getRecommendedBookStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getRecommendedBooksAPI.pending, (state, action) => {
        state.getRecommendedBookStatus = 'loading';
      })
      .addCase(getRecommendedBooksAPI.fulfilled, (state, action) => {
        state.getRecommendedBookStatus = 'succeeded';
        state.recommendedBookData = action.payload;
      })
      .addCase(getRecommendedBooksAPI.rejected, (state, action) => {
        state.getRecommendedBookStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default recommendedBookSlice.reducer;
