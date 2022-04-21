import axiosInstance from './api';
//import TokenService from './token.service';
import { refreshToken } from '../features/auth/authSlice';
const setup = (store) => {
  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (
        (originalConfig.url !== '/auth/signin' ||
          originalConfig.url !== '/auth/register') &&
        err.response
      ) {
        console.log('expired token');
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          dispatch(refreshToken());
          return axiosInstance(originalConfig);
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;
