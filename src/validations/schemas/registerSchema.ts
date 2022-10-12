import * as yup from 'yup';
import {checkIfEmailAleadyExists} from '../../axios/backendCallUser';

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required').trim(),
  email: yup
    .string()
    .email('Email is invalid')
    .required('Email is required')
    .test('check if email already exists', 'Email already exists', async value => {
      try {
        const body = {
          email: value,
        };
        await checkIfEmailAleadyExists(body);
        return false;
      } catch {
        return true;
      }
    }),
  password: yup.string().min(3, 'password is of length less than 3').max(20).required('password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'password must match'),
});

export default registerSchema;
