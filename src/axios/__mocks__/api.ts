import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';
import {allergyList, patientArray} from '../../__test__/constants';

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
