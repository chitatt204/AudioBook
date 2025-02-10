import {createSlice} from '@reduxjs/toolkit';
import {getSavedBookAPI} from '../../apis/Book';

const savedBookSlice = createSlice({
  name: 'savedBook',
  initialState: {
    savedBookData: {},
    getSavedBookStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSavedBookAPI.pending, (state, action) => {
        state.getSavedBookStatus = 'loading';
      })
      .addCase(getSavedBookAPI.fulfilled, (state, action) => {
        state.getSavedBookStatus = 'succeeded';
        state.savedBookData = action.payload;
      })
      .addCase(getSavedBookAPI.rejected, (state, action) => {
        state.getSavedBookStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default savedBookSlice.reducer;
