import {createSlice} from '@reduxjs/toolkit';
import {IAuth} from '../Interfaces/IAuth';

const defaultValue: IAuth = {
  login: false,
  id: 0,
  username: '',
  email: '',
};

export const authSlice = createSlice({
  name: 'authInfo',
  initialState: defaultValue,
  reducers: {
    makeLoggedInWithInfo: (state, action) => {
      state.login = true;
      state.id = action.payload.data.id;
      state.username = action.payload.data.name;
      state.email = action.payload.data.email;
    },
    makeLoggedOut: state => {
      state.login = false;
      state.id = 1;
      state.username = '';
      state.email = '';
    },
  },
});

export const {makeLoggedInWithInfo, makeLoggedOut} = authSlice.actions;
export const authReducer = authSlice.reducer;
