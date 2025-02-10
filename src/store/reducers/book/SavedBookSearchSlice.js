import {createSlice} from '@reduxjs/toolkit';
import {searchSavedBooksAPI} from '../../apis/Book';

const savedBookSearchSlice = createSlice({
  name: 'savedBookSearch',
  initialState: {
    savedBookSearchData: {},
    fetchSavedBookSearchStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchSavedBooksAPI.pending, (state, action) => {
        state.fetchSavedBookSearchStatus = 'loading';
      })
      .addCase(searchSavedBooksAPI.fulfilled, (state, action) => {
        state.fetchSavedBookSearchStatus = 'succeeded';
        state.savedBookSearchData = action.payload;
      })
      .addCase(searchSavedBooksAPI.rejected, (state, action) => {
        state.fetchSavedBookSearchStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default savedBookSearchSlice.reducer;
