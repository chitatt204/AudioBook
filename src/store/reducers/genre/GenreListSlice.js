import {createSlice} from '@reduxjs/toolkit';
import {getAllGenreAPI} from '../../apis/Genre';

const listGenreSlice = createSlice({
  name: 'listGerne',
  initialState: {
    listGerneData: {},
    fetchListGerneStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllGenreAPI.pending, (state, action) => {
        state.fetchListGerneStatus = 'loading';
      })
      .addCase(getAllGenreAPI.fulfilled, (state, action) => {
        state.fetchListGerneStatus = 'succeeded';
        state.listGerneData = action.payload;
      })
      .addCase(getAllGenreAPI.rejected, (state, action) => {
        state.fetchListGerneStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default listGenreSlice.reducer;
