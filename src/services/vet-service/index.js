import {authAxios} from 'utils/axios';
import {Apis} from '@constant';

export const getAll = async ({page = 1, order = ''}) => {
  const response = await authAxios({
    method: 'get',
    url: `${Apis.VET_SERVICE_ALL}?page=${page}&order=${order}`,
  });
  return response.data.data;
};

export const get = async (id) => {
  const response = await authAxios.get(`${Apis.VET_SERVICE_ALL}/${id}`);
  return response.data.data;
};
