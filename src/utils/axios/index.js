import axios from 'axios';
import authAxios from './auth';
import {Apis} from '@constant';

const defaultOptions = {
  baseURL: Apis.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
const generalAxios = axios.create(defaultOptions);
generalAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

generalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const status = error.response.status;
    if (status.toString()[0] == '5') {
      alert('Terjadi Kesalahan!\nSilahkan coba beberapa saat lagi!');
      return;
    }
    return Promise.reject(error);
  },
);

export {authAxios, generalAxios};
export default generalAxios;
