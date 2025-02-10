import {createSlice} from '@reduxjs/toolkit';
import {getUserInfAPI} from '../../apis/User';

const userInfSlice = createSlice({
  name: 'userInf',
  initialState: {
    userData: {},
    fetchUserStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserInfAPI.pending, (state, action) => {
        state.fetchUserStatus = 'loading';
      })
      .addCase(getUserInfAPI.fulfilled, (state, action) => {
        state.fetchUserStatus = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(getUserInfAPI.rejected, (state, action) => {
        state.fetchUserStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default userInfSlice.reducer;
