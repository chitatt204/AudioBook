import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';

export const loginAPI = createAsyncThunk('users/login', async data => {
  try {
    const response = await AxiosInstance().post('users/login', data);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const registerAPI = createAsyncThunk('users/register', async data => {
  try {
    const response = await AxiosInstance().post('users/register', data);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const addSearchHistoryAPI = createAsyncThunk(
  'users/login',
  async data => {
    try {
      const response = await AxiosInstance().post(
        'users/addSearchHistory',
        data,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getTopicsAPI = createAsyncThunk('users/getTopics', async email => {
  try {
    const response = await AxiosInstance().get(
      `users/getTopics?email=${email}`,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const setNotFirstLogin = createAsyncThunk('users/setNotFirst', async email => {
  try {
    const response = await AxiosInstance().get(
      `users/setNotFirst?email=${email}`,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const addTopicsAPI = createAsyncThunk('users/addGenres', async data => {
  try {
    const response = await AxiosInstance().put('users/addGenres', data);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const toggleSavedBookAPI = createAsyncThunk(
  'users/toggleSavedBook',
  async data => {
    try {
      const response = await AxiosInstance().post(
        'users/toggleSavedBook',
        data,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getUserInfAPI = createAsyncThunk('users/getUser', async email => {
  try {
    const response = await AxiosInstance().get(`users/getUser?email=${email}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateUserInfAPI = createAsyncThunk(
  'users/updateUserInf',
  async data => {
    try {
      const response = await AxiosInstance().post('users/updateUserInf', data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
