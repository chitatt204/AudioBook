import {createSlice} from '@reduxjs/toolkit';
import {updateUserInfAPI} from '../../apis/User';

const updateUserInfSlice = createSlice({
  name: 'updateUserInf',
  initialState: {
    updateUserData: {},
    fetchUpdateUserStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateUserInfAPI.pending, (state, action) => {
        state.fetchUpdateUserStatus = 'loading';
      })
      .addCase(updateUserInfAPI.fulfilled, (state, action) => {
        state.fetchUpdateUserStatus = 'succeeded';
        state.updateUserData = action.payload;
      })
      .addCase(updateUserInfAPI.rejected, (state, action) => {
        state.fetchUpdateUserStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default updateUserInfSlice.reducer;
