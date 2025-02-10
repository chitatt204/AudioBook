import {createSlice} from '@reduxjs/toolkit';
import {getReviewsByBookId} from '../../apis/Reviews';

const reviewsOfBookSlice = createSlice({
  name: 'reviewsOfBook',
  initialState: {
    reviewData: {},
    fetchReviewStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getReviewsByBookId.pending, (state, action) => {
        state.fetchReviewStatus = 'loading';
      })
      .addCase(getReviewsByBookId.fulfilled, (state, action) => {
        state.fetchReviewStatus = 'succeeded';
        state.reviewData = action.payload;
      })
      .addCase(getReviewsByBookId.rejected, (state, action) => {
        state.fetchReviewStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default reviewsOfBookSlice.reducer;
