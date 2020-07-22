import {authAxios} from '@util/axios';
import {Apis} from '@constant';

export const create = (data) => {
  return authAxios.post(Apis.TREATMENT_CREATE, data);
};

export const update = (id, data) => {
  return authAxios.put(Apis.TREATMENT_UPDATE, {...data, id});
};

export const remove = (id) => {
  return authAxios.delete(Apis.TREATMENT_DELETE, {data: {id}});
};
