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
        console.log('fdsf')
      const originalConfig = err.config;
      if (originalConfig.url !== '/auth/signin' && err.response) {
          console.log('expired token')
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
        //   try {
        //     const rs = await axiosInstance.post('/auth/refreshtoken', {
        //       refreshToken: TokenService.getLocalRefreshToken(),
        //     });
        //     const { accessToken } = rs.data;
        //     dispatch(refreshToken(accessToken));
        //     TokenService.updateLocalAccessToken(accessToken);
        //     return axiosInstance(originalConfig);
        //   } catch (_error) {
        //     return Promise.reject(_error);
        //   }
        dispatch(refreshToken())
        return axiosInstance(originalConfig);
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;
