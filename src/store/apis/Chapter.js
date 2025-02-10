import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';

export const getListChapterAPI = createAsyncThunk(
  'chapters/getListChapter',
  async bookId => {
    try {
      const response = await AxiosInstance().get(
        `chapters/getListChapterByBookId?bookId=${bookId}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
