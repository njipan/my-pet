import {authAxios} from '@util/axios';

const API = '/events';

export const get = async (id) => {
  const response = await authAxios.get(`${API}/${id}`);
  return response.data.data;
};

export const all = async (config = {}) => {
  const response = await authAxios.get(`${API}`);
  return response.data.data;
};
