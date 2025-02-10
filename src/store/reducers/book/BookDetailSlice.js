import {createSlice} from '@reduxjs/toolkit';
import {getBookByIdAPI} from '../../apis/Book';

const bookDetailSlice = createSlice({
  name: 'detailBook',
  initialState: {
    bookDetailData: {},
    fetchBookDetailStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBookByIdAPI.pending, (state, action) => {
        state.fetchBookDetailStatus = 'loading';
      })
      .addCase(getBookByIdAPI.fulfilled, (state, action) => {
        state.fetchBookDetailStatus = 'succeeded';
        state.bookDetailData = action.payload;
      })
      .addCase(getBookByIdAPI.rejected, (state, action) => {
        state.fetchBookDetailStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default bookDetailSlice.reducer;
