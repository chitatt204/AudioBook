import {createSlice} from '@reduxjs/toolkit';
import {getNewBooksAPI} from '../../apis/Book';

const newReleaseBookSlice = createSlice({
  name: 'newReleaseBooks',
  initialState: {
    newReleaseBookData: {},
    getNewReleaseBookStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getNewBooksAPI.pending, (state, action) => {
        state.getNewReleaseBookStatus = 'loading';
      })
      .addCase(getNewBooksAPI.fulfilled, (state, action) => {
        state.getNewReleaseBookStatus = 'succeeded';
        state.newReleaseBookData = action.payload;
      })
      .addCase(getNewBooksAPI.rejected, (state, action) => {
        state.getNewReleaseBookStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default newReleaseBookSlice.reducer;
