import {createSlice} from '@reduxjs/toolkit';
import {getListChapterAPI} from '../../apis/Chapter';

const chapterListSlice = createSlice({
  name: 'listChapter',
  initialState: {
    listChapterData: {},
    getListChapterStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListChapterAPI.pending, (state, action) => {
        state.getListChapterStatus = 'loading';
      })
      .addCase(getListChapterAPI.fulfilled, (state, action) => {
        state.getListChapterStatus = 'succeeded';
        state.listChapterData = action.payload;
      })
      .addCase(getListChapterAPI.rejected, (state, action) => {
        state.getListChapterStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default chapterListSlice.reducer;
