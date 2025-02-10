import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';

export const getReviewsByBookId = createAsyncThunk(
  '/reviews/getReviewsByBookId',
  async bookId => {
    try {
      const response = await AxiosInstance().get(
        `reviews/getReviewsByBookId?bookId=${bookId}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
