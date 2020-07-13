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
    const token = await AsyncStorage.getItem('_token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const status = error.response.status;

    if (status === 401 || status === 403) {
      alert('Autentikasi gagal!');
      Navigation.navigate(Screens.LOGIN_SCREEN);
    }
    return Promise.reject(error);
  },
);

export default authAxios;
