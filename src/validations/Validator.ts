import * as yup from 'yup';
const Validator = (
  inputs: any,
  schema: yup.ObjectSchema<any>,
  handleErrors: (error: string, label: string) => void,
): boolean => {
  try {
    schema.validateSync(inputs, {
      abortEarly: false,
    });
    return true;
  } catch (err: any) {
    err.inner.forEach((e: any) => {
      handleErrors(e.message, e.path);
    });
    console.log(err.inner);
    return false;
  }
};

export const asyncValidator = async (
  inputs: any,
  schema: yup.ObjectSchema<any>,
  handleErrors: (error: string, label: string) => void,
): Promise<boolean> => {
  try {
    await schema.validate(inputs, {
      abortEarly: false,
    });
    return true;
  } catch (err: any) {
    err.inner.forEach((e: any) => {
      handleErrors(e.message, e.path);
    });
    return false;
  }
};

export default Validator;
