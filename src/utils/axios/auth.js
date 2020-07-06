import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from '@util/navigation';
import {Screens} from '@constant';

import {Apis} from '@constant';
const defaultOptions = {
  baseURL: Apis.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
const authAxios = axios.create(defaultOptions);
authAxios.interceptors.request.use(
  async (config) => {
    const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjciLCJlbWFpbCI6InBuamlrcm5hQGdtYWlsLmNvbSIsImlhdCI6MTU5MzYxNDk1OSwiZXhwIjoxNTkzNzAxMzU5fQ.kotrhxx22W7dmYWSOBUgBMpkxf9cdI_kwlGj0TkCXG0`;
    const token = AsyncStorage.getItem('_token') || accessToken;
    config.headers.Authorization = accessToken ? `Bearer ${token}` : '';
    return config;
  },
  (error) => Promise.reject(error),
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      config,
      response: {status},
    } = error;
    if (status === 401) {
      alert('Autentikasi gagal!');
      Navigation.navigate(Screens.LOGIN_SCREEN);
    }
    return Promise.reject(error);
  },
);

export default authAxios;
