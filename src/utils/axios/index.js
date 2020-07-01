import axios from 'axios';
import {Apis} from '@constant';
const defaultOptions = {
  baseURL: Apis.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};
export const authAxios = axios.create(defaultOptions);
const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjciLCJlbWFpbCI6InBuamlrcm5hQGdtYWlsLmNvbSIsImlhdCI6MTU5MzYxNDk1OSwiZXhwIjoxNTkzNzAxMzU5fQ.kotrhxx22W7dmYWSOBUgBMpkxf9cdI_kwlGj0TkCXG0`;
authAxios.interceptors.request.use((config) => {
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  return config;
});

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Error
    const {
      config,
      response: {status},
    } = error;
    return Promise.reject(error);
  },
);
