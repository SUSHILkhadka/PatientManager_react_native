import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../services/api';
import {getRefreshToken} from '../../services/asyncStorage';
import {IAuth} from '../Interfaces/IAuth';

const defaultValue: IAuth = {
  login: false,
  id: 0,
  username: '',
  email: '',
  isLoading: 'loading',
};

export const checkToken = createAsyncThunk(
  'authInfo/checkRefreshToken',
  async (): Promise<any> => {
    const response = await instance.post('/token', {
      refreshToken: await getRefreshToken(),
    });
    return response;
  },
);

export const authSlice = createSlice({
  name: 'authInfo',
  initialState: defaultValue,
  reducers: {
    makeLoggedInWithInfo: (state, action) => {
      state.login = true;
      state.id = action.payload.data.id;
      state.username = action.payload.data.name;
      state.email = action.payload.data.email;
      state.isLoading = 'fulfilled';
    },
    makeLoggedOut: state => {
      state.login = false;
      state.id = 1;
      state.username = '';
      state.email = '';
    },
  },
  // extraReducers: {
  //   [checkToken.pending.toString()]: (state: IAuth) => {
  //     state.isLoading = 'loading';
  //   },
  //   [checkToken.fulfilled]:(state:any,action:any)=>{
  //     makeLoggedInWithInfo(action);
  //   }
  // },
  extraReducers: builder => {
    builder
      .addCase(checkToken.pending, state => {
        state.isLoading='loading'
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.isLoading='fulfilled'
        makeLoggedInWithInfo(action)
      }).addCase(checkToken.rejected,(state)=>{
        state.isLoading='failed'
      })
  },
});

export const {makeLoggedInWithInfo, makeLoggedOut} = authSlice.actions;
export const authReducer = authSlice.reducer;
