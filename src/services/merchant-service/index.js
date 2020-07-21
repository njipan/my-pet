import {authAxios} from '@util/axios';
import {Apis} from '@constant';

export const getMe = async () => {
  const response = await authAxios.get(`${Apis.PROFILE_MERCHANT}`);
  return response.data.data;
};

export const update = (data) => {
  return authAxios.put(Apis.UPDATE_MERCHANT, {...data});
};

export const updatePassword = (data) => {
  return authAxios.put(Apis.UPDATE_PASSWORD, {...data});
};
