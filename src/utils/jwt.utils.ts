import jwt from 'jwt-decode';

export const getDataFromJWTToken = (token: string) => {
  const data = jwt(token);
  return data;
};
