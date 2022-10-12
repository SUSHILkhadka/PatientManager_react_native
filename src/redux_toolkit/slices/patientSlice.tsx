import {createSlice} from '@reduxjs/toolkit';
import {IPatient} from '../Interfaces/IPatient';

export const defaultValue: IPatient = {
  patientId: 0,
  name: '',
  email: '',
  contact: '',
  dob: '',
  address: '',
  photoUrl: '',
  specialAttention: false,
};

export const patientSlice = createSlice({
  name: 'patientInfo',
  initialState: defaultValue,
  reducers: {
    loadPatient: (state, action) => {
      state.patientId = action.payload.patientId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.contact = action.payload.contact;
      state.dob = action.payload.dob;
      state.address = action.payload.address;
      state.specialAttention = action.payload.specialAttention;
      state.photoUrl = action.payload.photoUrl;
    },
    resetPatient: () => defaultValue,
    changePhotoUrlOfPatient: (state, action) => {
      state.photoUrl = action.payload;
    },
  },
});

export const {loadPatient, resetPatient, changePhotoUrlOfPatient} = patientSlice.actions;
export const patientReducer = patientSlice.reducer;
