import {createSlice} from '@reduxjs/toolkit';
import {registerAPI} from '../../apis/User';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    registerData: {},
    fetchRegisterStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerAPI.pending, (state, action) => {
        state.fetchRegisterStatus = 'loading';
      })
      .addCase(registerAPI.fulfilled, (state, action) => {
        state.fetchRegisterStatus = 'succeeded';
        state.registerData = action.payload;
      })
      .addCase(registerAPI.rejected, (state, action) => {
        state.fetchRegisterStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default registerSlice.reducer;
