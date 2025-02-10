import {createSlice} from '@reduxjs/toolkit';
import {getUserGenresAPI} from '../../apis/Genre';

const userGerneSlice = createSlice({
  name: 'genreOfUser',
  initialState: {
    userGenreData: {},
    getUserGenreStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserGenresAPI.pending, (state, action) => {
        state.getUserGenreStatus = 'loading';
      })
      .addCase(getUserGenresAPI.fulfilled, (state, action) => {
        state.getUserGenreStatus = 'succeeded';
        state.userGenreData = action.payload;
      })
      .addCase(getUserGenresAPI.rejected, (state, action) => {
        state.getUserGenreStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default userGerneSlice.reducer;
