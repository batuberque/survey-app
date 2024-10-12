import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import authReducer from './slices/authSlice';
import registerReducer from './slices/registerSlice';
import surveyReducer from './slices/surveySlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'survey'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  user: userReducer,
  survey: surveyReducer,
  register: registerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
