import {authAxios} from '@util/axios';
import {Apis} from '@constant';

export const getMe = (id) => {
  return authAxios.get(`${Apis.PROFILE_CUSTOMER}`);
};

export const update = (data) => {
  return authAxios.put(Apis.UPDATE_CUSTOMER, {...data});
};

export const updatePassword = (data) => {
  return authAxios.put(Apis.UPDATE_PASSWORD_CUSTOMER, {...data});
};
