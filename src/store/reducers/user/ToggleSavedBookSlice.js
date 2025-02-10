import {createSlice} from '@reduxjs/toolkit';
import {toggleSavedBookAPI} from '../../apis/User';

const toggleSavedBookSlice = createSlice({
  name: 'toggleSavedBook',
  initialState: {
    savedBookChangeData: {},
    fetchChangeSavedBookStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(toggleSavedBookAPI.pending, (state, action) => {
        state.fetchChangeSavedBookStatus = 'loading';
      })
      .addCase(toggleSavedBookAPI.fulfilled, (state, action) => {
        state.fetchChangeSavedBookStatus = 'succeeded';
        state.savedBookChangeData = action.payload;
      })
      .addCase(toggleSavedBookAPI.rejected, (state, action) => {
        state.fetchChangeSavedBookStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default toggleSavedBookSlice.reducer;
