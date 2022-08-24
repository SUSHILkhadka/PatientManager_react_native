import { createSlice } from '@reduxjs/toolkit';
export interface IAuth {
  login: boolean;
  id: number;
  username: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

const defaultValue: IAuth = {
  login: false,
  id: 0,
  username: '',
  email: '',
  password: '',
  accessToken: '',
  refreshToken: '',
};

export const authSlice = createSlice({
  name: 'authInfo',
  initialState: defaultValue,
  reducers: {
    makeLoggedIn: (state) => {
      state.login = true;
    },
    makeLoggedInWithInfo: (state, action) => {
      state.login = true;
      state.id = action.payload.data.id;
      state.username = action.payload.data.name;
      state.email = action.payload.data.email;
      state.password = action.payload.data.password;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    makeLoggedOut: (state) => {
      state.login = false;
      state.username = '';
      state.email = '';
      state.password = '';
      state.accessToken = '';
    },
    changeName: (state, action) => {
      state.username = action.payload.name;
      state.password = action.payload.password;
    },
    DELETETHISLATER:(state,action)=>{
      state.username=action.payload
    }
  },
});

export const { DELETETHISLATER, makeLoggedIn, makeLoggedInWithInfo, makeLoggedOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
