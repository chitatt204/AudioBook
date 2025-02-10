import {configureStore} from '@reduxjs/toolkit';
import bookDetailReducer from './reducers/book/BookDetailSlice';
import registerReducer from './reducers/user/RegisterSlice';
import loginReducer from './reducers/user/LoginSlice';
import listGenreReducer from './reducers/genre/GenreListSlice';
import recommendedBookReducer from './reducers/book/RecommendedBookSlice';
import topTrendingBookReducer from './reducers/book/TopTrendingBookSlice';
import newReleaseBookReducer from './reducers/book/NewReleaseBookSlice';
import userGerneSlice from './reducers/genre/UserGenreSlice';
import bookSearchReducer from './reducers/book/BookSearchSlice';
import searchHistoryReducer from './reducers/book/SearchHistorySlice';
import reviewsOfBookReducer from './reducers/review/ReviewsOfBookSlice';
import chapterListReducer from './reducers/chapter/ChapterListSlice';
import savedBookReducer from './reducers/book/SavedBookSlice';
import toggleSavedBookReducer from './reducers/user/ToggleSavedBookSlice';
import bookOfGerneReducer from './reducers/book/BookOfGenreSlice';
import searchGenreReducer from './reducers/genre/SearchGenreSlice';
import addToSearchHistoryReducer from './reducers/user/AddBookToSearchHistory';
import savedBookSearchReducer from './reducers/book/SavedBookSearchSlice';
import userInfReducer from './reducers/user/UserInfSlice';
import updateUserInfReducer from './reducers/user/UpdateUserInfSlice';
export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    listGenre: listGenreReducer,
    bookDetail: bookDetailReducer,
    recommendedBooks: recommendedBookReducer,
    topTrendingBooks: topTrendingBookReducer,
    newReleaseBooks: newReleaseBookReducer,
    genreOfUser: userGerneSlice,
    bookSearch: bookSearchReducer,
    searchHistory: searchHistoryReducer,
    reviewsOfBook: reviewsOfBookReducer,
    listChapter: chapterListReducer,
    savedBook: savedBookReducer,
    toggleSavedBook: toggleSavedBookReducer,
    bookOfGenre: bookOfGerneReducer,
    searchGenre: searchGenreReducer,
    addToSearchHistory: addToSearchHistoryReducer,
    savedBookSearch: savedBookSearchReducer,
    userInf: userInfReducer,
    updateUserInf: updateUserInfReducer,
  },
});
export default store;
