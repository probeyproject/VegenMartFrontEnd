// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import locationReducer from './slices/locationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
  },
});

export default store;
