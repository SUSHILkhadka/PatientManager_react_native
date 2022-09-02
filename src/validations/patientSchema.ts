import * as yup from 'yup';

const patientSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  contact:yup.string().min(5,'phone no is invalid, very short').max(14,'phone no is invalid, very long'),
  dob:yup.date()
});

export default patientSchema;
