import {createSlice} from '@reduxjs/toolkit';
import {addSearchHistoryAPI} from '../../apis/User';

const addToSearchHistorySlice = createSlice({
  name: 'addToSearchHistory',
  initialState: {
    addToHistoryData: {},
    fetchAddToHistoryStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addSearchHistoryAPI.pending, (state, action) => {
        state.fetchAddToHistoryStatus = 'loading';
      })
      .addCase(addSearchHistoryAPI.fulfilled, (state, action) => {
        state.fetchAddToHistoryStatus = 'succeeded';
        state.addToHistoryData = action.payload;
      })
      .addCase(addSearchHistoryAPI.rejected, (state, action) => {
        state.fetchAddToHistoryStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default addToSearchHistorySlice.reducer;
