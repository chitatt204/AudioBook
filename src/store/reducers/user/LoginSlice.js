import {createSlice} from '@reduxjs/toolkit';
import {loginAPI} from '../../apis/User';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginData: {},
    fetchLoginStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAPI.pending, (state, action) => {
        state.fetchLoginStatus = 'loading';
      })
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.fetchLoginStatus = 'succeeded';
        state.loginData = action.payload;
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.fetchLoginStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default loginSlice.reducer;
