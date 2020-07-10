import generalAxios from '@util/axios';
import {Apis} from '@constant';
import AsyncStorage from '@react-native-community/async-storage';

export const login = ({email, password, type}) => {
  return generalAxios.post(Apis.SIGN_IN, {
    email,
    password,
    type,
  });
};
export const setToken = (token) => {
  return AsyncStorage.setItem('_token', token);
};
export const register = (data) => {
  return generalAxios({
    method: 'post',
    url: Apis.REGISTER,
    data,
  });
};
