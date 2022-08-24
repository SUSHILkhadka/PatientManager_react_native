import { createSlice } from '@reduxjs/toolkit';
export interface PageNumber {
  page: number;
}

const defaultValue: PageNumber = {
  page: 2,
};

export const pageSlice = createSlice({
  name: 'pageInfo',
  initialState: defaultValue,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { changePage } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
