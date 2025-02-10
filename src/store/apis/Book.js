import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';

export const getBookByIdAPI = createAsyncThunk(
  'books/getBookById',
  async bookId => {
    try {
      const response = await AxiosInstance().get(
        `books/getBookById?bookId=${bookId}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getBooksByGenreIdAPI = createAsyncThunk(
  'books/getBookByGenreId',
  async genreId => {
    try {
      const response = await AxiosInstance().get(
        `books/getBookByGenreId?genreId=${genreId}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getTopTrendingBookAPI = createAsyncThunk(
  'books/getTopRatedBooks',
  async () => {
    try {
      const response = await AxiosInstance().get('books/getTopRatedBooks');
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getRecommendedBooksAPI = createAsyncThunk(
  'books/getRecommendedBooks',
  async email => {
    try {
      const response = await AxiosInstance().get(
        `books/getRecommendedBooks?email=${email}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getNewBooksAPI = createAsyncThunk(
  'books/getNewBooks',
  async () => {
    try {
      const response = await AxiosInstance().get('books/getNewBooks');
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getSearchHistoryAPI = createAsyncThunk(
  'books/getSearchHistory',
  async email => {
    try {
      const response = await AxiosInstance().get(
        `books/getSearchHistory?email=${email}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const getBookSearchAPI = createAsyncThunk(
  'books/getBookBySubString',
  async subString => {
    try {
      const response = await AxiosInstance().get(
        `books/getBookBySubString?subString=${subString}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getSavedBookAPI = createAsyncThunk(
  'books/getSavedBook',
  async email => {
    try {
      const response = await AxiosInstance().get(
        `books/getSavedBook?email=${email}`,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const searchSavedBooksAPI = createAsyncThunk(
  'books/searchSavedBooks',
  async body => {
    try {
      const response = await AxiosInstance().post(
        'books/searchSavedBooks',
        body,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
