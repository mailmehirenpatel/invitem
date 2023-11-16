import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducers from './slice';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading'],
  debug: true, //to get useful logging
};
import {persistStore, persistReducer} from 'redux-persist';

// Call Reducer Through Persist Reducer
const reducers = persistReducer(config, rootReducers);

// Call Reducer and MiddleWare in Store Through Configure Store
export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

// Call Persist Store
export const persistor = persistStore(store);
