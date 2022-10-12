import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {authReducer} from '../slices/authSlice';
import {pageReducer} from '../slices/pageSlice';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {patientReducer} from '../slices/patientSlice';
import {allergyReducer} from '../slices/allergySlice';
const persistConfig = {
  key: 'KeyForPersistStore',
  storage: AsyncStorage,
};

export const allReducers = combineReducers({
  auth: authReducer,
  page: pageReducer,
  patient: patientReducer,
  allergy: allergyReducer,
});
const persistedAuthReducer = persistReducer(persistConfig, allReducers);

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
