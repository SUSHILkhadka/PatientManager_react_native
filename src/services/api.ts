import axios from 'axios';
import {getAccessToken, getRefreshToken, saveAccessToken} from './asyncStorage';
import {URL_TO_BACKEND} from '@env';

/**
 * axios instane is create with given base url and headers type
 */
const instance = axios.create({
  baseURL: URL_TO_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * interceptors setup for that instance before sending any request
 */
instance.interceptors.request.use(
  async config => {
    if (config.headers) config.headers['Authorization'] = 'Bearer ' + (await getAccessToken());
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * interceptors setup for axios instance after getting any response
 */
instance.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;
    if (err.response) {
      //got error response
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response.data.message === 'invalid access token'
      ) {
        // Access Token was expired

        originalConfig._retry = true;
        try {
          const rs = await instance.post('/token', {
            refreshToken: await getRefreshToken(),
          });
          const {accessToken} = rs.data;
          await saveAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  },
);
export default instance;
