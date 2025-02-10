import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';

export const getAllGenreAPI = createAsyncThunk('genres/', async () => {
  try {
    const response = await AxiosInstance().get('genres/');
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getUserGenresAPI = createAsyncThunk(
  'genres/getUserGenres',
  async email => {
    try {
      const response = await AxiosInstance().get(
        `genres/getUserGenres?email=${email}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const searchGenresAPI = createAsyncThunk(
  'genres/searchGenresBySubname',
  async subName => {
    try {
      const response = await AxiosInstance().get(
        `genres/searchGenresBySubname?subName=${subName}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
