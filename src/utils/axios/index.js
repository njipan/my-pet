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
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export {authAxios, generalAxios};
export default generalAxios;
