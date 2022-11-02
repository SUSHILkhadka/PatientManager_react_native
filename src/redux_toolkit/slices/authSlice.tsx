import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/api';
import {getRefreshToken} from '../../async_storage/asyncStorage';
import {IAuth} from '../Interfaces/IAuth';

const defaultValue: IAuth = {
  id: 0,
  username: '',
  email: '',
  isLoading: 'loading',
};

export const checkToken = createAsyncThunk('authInfo/checkRefreshToken', async (): Promise<any> => {
  const response = await instance.post('/token', {
    refreshToken: await getRefreshToken(),
  });
  return response.data;
});

export const authSlice = createSlice({
  name: 'authInfo',
  initialState: defaultValue,
  reducers: {
    loadAuthInfoWithLoginInfo: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.name;
      state.email = action.payload.email;
      state.isLoading = 'fulfilled';
    },
    logoutAuthInfo: state => {
      state.id = 0;
      state.username = '';
      state.email = '';
      state.isLoading = 'rejected';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkToken.pending, state => {
        state.isLoading = 'loading';
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        console.log(action.payload.data);

        state.isLoading = 'fulfilled';
        state.id = action.payload.data.id;
        state.username = action.payload.data.name;
        state.email = action.payload.data.email;
      })
      .addCase(checkToken.rejected, state => {
        state.isLoading = 'rejected';
        state.id = 0;
        state.username = '';
        state.email = '';
      });
  },
});

export const {loadAuthInfoWithLoginInfo, logoutAuthInfo} = authSlice.actions;
export const authReducer = authSlice.reducer;
