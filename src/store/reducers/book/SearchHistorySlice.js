import {createSlice} from '@reduxjs/toolkit';
import {getSearchHistoryAPI} from '../../apis/Book';

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState: {
    searchHistoryData: {},
    getSearchHistoryStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSearchHistoryAPI.pending, (state, action) => {
        state.getSearchHistoryStatus = 'loading';
      })
      .addCase(getSearchHistoryAPI.fulfilled, (state, action) => {
        state.getSearchHistoryStatus = 'succeeded';
        state.searchHistoryData = action.payload;
      })
      .addCase(getSearchHistoryAPI.rejected, (state, action) => {
        state.getSearchHistoryStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default searchHistorySlice.reducer;
