import {createSlice} from '@reduxjs/toolkit';
import {IAllergy} from '../Interfaces/IAllergy';

export const initialState: IAllergy[] = [];

export const allergySlice = createSlice({
  name: 'allergyInfo',
  initialState: initialState,
  reducers: {
    loadAllergyList: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const temp: IAllergy = {
          id: action.payload[i].id,
          name: action.payload[i].name,
          status: 'read',
        };
        state.push(temp);
      }
    },
    resetAllergyList: () => initialState,
    addNewAllergy: (state, action) => {
      const newAllergy: IAllergy = {
        id: -Date.now(),
        name: action.payload,
        status: 'added',
      };
      state.push(newAllergy);
    },
    deleteAllergy: (state, action) => {
      const index = action.payload;
      if (state[index].id < 0) {
        const temp = state;
        temp.splice(action.payload, 1);
        state = temp;
      } else {
        state[index].status = 'deleted';
      }
    },
    editAllergy: (state, action) => {
      const index = action.payload.index;
      const name = action.payload.name;

      state[index].name = name;

      if (state[index].id >= 0) {
        state[index].status = 'edited';
      }
    },
  },
});

export const {loadAllergyList, resetAllergyList, addNewAllergy, deleteAllergy, editAllergy} = allergySlice.actions;
export const allergyReducer = allergySlice.reducer;
