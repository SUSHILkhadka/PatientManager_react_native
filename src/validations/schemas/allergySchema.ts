import * as yup from 'yup';

const allerygySchema = yup.object().shape({
  allergyName: yup.string().required('Allery name is required').trim(),
});

export default allerygySchema;
