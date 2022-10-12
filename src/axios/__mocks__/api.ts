import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';

export const patientArray = [
  {
    patientId: 0,
    name: 'first patient',
    email: 'asdfas',
    contact: 'asdfas',
    dob: 'asdfas',
    address: 'asdfas',
    photoUrl: 'asdfas',
    specialAttention: false,
  },
  {
    patientId: 1,
    name: 'second patient',
    email: 'asdfas',
    contact: 'asdfas',
    dob: 'asdfas',
    address: 'asdfas',
    photoUrl: 'asdfas',
    specialAttention: false,
  },
];

export const allergyList: IAllergy[] = [
  {
    id: -1,
    name: 'allery1',
    status: 'added',
  },
  {
    id: 2,
    name: 'allery3',
    status: 'added',
  },
  {
    id: 3,
    name: 'allery3',
    status: 'deleted',
  },
];

module.exports = {
  post: (url: string, body: any = 'without any body') => {
    return {
      data: {
        data: body,
      },
    };
  },
  get: (url: string) => {
    return {
      data: {
        data: url == '/patient/' ? patientArray : allergyList,
      },
    };
  },
  put: (url: string, body: any) => {
    return {
      data: {
        data: body,
      },
    };
  },
  delete: (url: string, body: any = 'without any body') => {
    return {
      data: {
        data: body,
      },
    };
  },
};
