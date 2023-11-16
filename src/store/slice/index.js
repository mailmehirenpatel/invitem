/*
 * combines all th existing reducers
 */
import {combineReducers} from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import eventSlice from './eventSlice';
import profileSlice from './profileSlice';
import themeSlice from './themeSlice';
import infoChirpsSlice from './infoChirpsSlice';
import chatSlice from './chatSlice';

// Call All Slice Files In One Reducer
const reducers = {
  auth: AuthSlice,
  theme: themeSlice,
  profile: profileSlice,
  event: eventSlice,
  infoChirps: infoChirpsSlice,
  chat: chatSlice,
};

// Exports
const rootReducer = combineReducers(reducers);
export default rootReducer;
