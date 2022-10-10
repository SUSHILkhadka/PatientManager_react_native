import * as yup from 'yup';

export const editNameSchema = yup.object().shape({
  previousName: yup.string(),
  name: yup
    .string()
    .notOneOf([yup.ref('previousName')], 'new name cannot be old name')
    .required('name is required'),
  oldPassword: yup.string().required('old password is required'),
});
const editUserSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  oldPassword: yup.string().required('old password is required'),
  password: yup
    .string()
    .notOneOf([yup.ref('oldPassword')], 'new password cannot be same as old password')
    .min(3, 'password is of length less than 3')
    .max(20)
    .required('new password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Both password must match'),
});

export default editUserSchema;
