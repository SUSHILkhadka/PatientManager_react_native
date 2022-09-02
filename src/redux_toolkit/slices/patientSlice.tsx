import {createSlice} from '@reduxjs/toolkit';
import {IPatient} from '../Interfaces/IPatient';

const defaultValue: IPatient = {
  patientId: 0,
  name: '',
  email: '',
  contact: '',
  dob: '',
  address: '',
  photoUrl: '',
  specialAttention: false,
  allergies: '',
};

export const patientSlice = createSlice({
  name: 'patientInfo',
  initialState: defaultValue,
  reducers: {
    load: (state, action) => {
      state.patientId = action.payload.patientId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.contact = action.payload.contact;
      state.dob = action.payload.dob;
      state.address = action.payload.address;
      state.specialAttention = action.payload.specialAttention;
      state.allergies = action.payload.allergies;
      state.photoUrl = action.payload.photoUrl;
    },
    reset: (state: IPatient) => {
      state.patientId = 0;
      state.name = '';
      state.email = '';
      state.contact = '';
      state.dob = '';
      state.address = '';
      state.specialAttention = false;
      state.allergies = '';
      state.photoUrl = '';
    },
    changePhotoUrl: (state, action) => {
      state.photoUrl = action.payload;
    },
  },
});

export const {load, reset, changePhotoUrl} = patientSlice.actions;
export const patientReducer = patientSlice.reducer;
