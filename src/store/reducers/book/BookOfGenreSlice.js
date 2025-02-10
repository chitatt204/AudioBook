import {createSlice} from '@reduxjs/toolkit';
import {getBooksByGenreIdAPI} from '../../apis/Book';

const bookOfGenreSlice = createSlice({
  name: 'bookOfGenre',
  initialState: {
    bookOfGenreData: {},
    fetchBookOfGenreStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBooksByGenreIdAPI.pending, (state, action) => {
        state.fetchBookOfGenreStatus = 'loading';
      })
      .addCase(getBooksByGenreIdAPI.fulfilled, (state, action) => {
        state.fetchBookOfGenreStatus = 'succeeded';
        state.bookOfGenreData = action.payload;
      })
      .addCase(getBooksByGenreIdAPI.rejected, (state, action) => {
        state.fetchBookOfGenreStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default bookOfGenreSlice.reducer;
