import {createSlice} from '@reduxjs/toolkit';
import {IPageNumber} from '../Interfaces/IPageNumber';

const defaultValue: IPageNumber = {
  page: 2,
  refreshFlag: false,
};

export const pageSlice = createSlice({
  name: 'pageInfo',
  initialState: defaultValue,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    refreshPage: (state, action) => {
      state.refreshFlag = action.payload;
      console.log('in refreshpage dispacth', state.refreshFlag);
    },
  },
});

export const {changePage, refreshPage} = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
