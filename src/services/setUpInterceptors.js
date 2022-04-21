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
      //console.log(originalConfig);
      if (
        (originalConfig.url !== '/auth/signin' ||
          originalConfig.url !== '/auth/register') &&
        err.response
      ) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          await dispatch(refreshToken());
          let state = store.getState();
          originalConfig.headers.Authorization = `Token ${state.auth.accessToken}`;
          return axiosInstance(originalConfig);
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;
