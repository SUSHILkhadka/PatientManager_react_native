import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {authReducer} from '../slices/authSlice';
import {pageReducer} from '../slices/pageSlice';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'KeyForPersistStore',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  auth: authReducer,
  page: pageReducer,
});
const persistedAuthReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export const persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
