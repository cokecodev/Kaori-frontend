import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userReducer';
import searchReducer from './features/searchReducer';
import fetchStatusReducer from './features/fetchStatusReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    fetchStatus: fetchStatusReducer,
  },
});
