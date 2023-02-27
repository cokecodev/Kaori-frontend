import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userReducer';
import searchReducer from './features/searchReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});
