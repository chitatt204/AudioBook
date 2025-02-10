import {createSlice} from '@reduxjs/toolkit';
import {getBookSearchAPI} from '../../apis/Book';

const bookSearchSlice = createSlice({
  name: 'bookSearch',
  initialState: {
    bookSearchData: {},
    getBookSearchStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBookSearchAPI.pending, (state, action) => {
        state.getBookSearchStatus = 'loading';
      })
      .addCase(getBookSearchAPI.fulfilled, (state, action) => {
        state.getBookSearchStatus = 'succeeded';
        state.bookSearchData = action.payload;
      })
      .addCase(getBookSearchAPI.rejected, (state, action) => {
        state.getBookSearchStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default bookSearchSlice.reducer;
