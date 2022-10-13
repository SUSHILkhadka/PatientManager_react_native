import * as yup from 'yup';

const phoneNumberRegularExpression = /(^[0-9*#+-]*$)/;

const patientSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  contact: yup
    .string()
    .trim()
    .when({
      is: (contact: string) => Boolean(contact) === false,
      then: yup.string().nullable(),
      otherwise: yup.string().matches(phoneNumberRegularExpression, 'contact number is not valid phone number'),
    }),

  dob: yup.date().typeError('Invalid date').nullable(),
});

export default patientSchema;
