import {createSlice} from '@reduxjs/toolkit';
import {searchGenresAPI} from '../../apis/Genre';

const searchGenreSlice = createSlice({
  name: 'searchGenre',
  initialState: {
    searchGenreData: {},
    fetchSearchGenreStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchGenresAPI.pending, (state, action) => {
        state.fetchSearchGenreStatus = 'loading';
      })
      .addCase(searchGenresAPI.fulfilled, (state, action) => {
        state.fetchSearchGenreStatus = 'succeeded';
        state.searchGenreData = action.payload;
      })
      .addCase(searchGenresAPI.rejected, (state, action) => {
        state.fetchSearchGenreStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default searchGenreSlice.reducer;
