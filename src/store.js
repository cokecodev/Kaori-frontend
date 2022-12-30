import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userReducer';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
