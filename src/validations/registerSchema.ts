import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(3, 'password is of length less than 3')
    .max(20)
    .required('password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'password must match'),
});

export default registerSchema;
