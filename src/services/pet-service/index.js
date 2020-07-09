import {authAxios} from '@util/axios';
import {Apis} from '@constant';

export const create = (data) => {
  return authAxios.post(Apis.PET_CREATE, data);
};

export const get = (id) => {
  return authAxios.get(`${Apis.PET_ALL}/${id}`);
};

export const all = (config = {}) => {
  return authAxios.get(`${Apis.PET_ALL}`);
};

export const update = (id, data) => {
  return authAxios.put(Apis.PET_UPDATE, {...data, id});
};
