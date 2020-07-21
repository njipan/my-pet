import generalAxios from '@util/axios';
import {Apis, UserType} from '@constant';
import AsyncStorage from '@react-native-community/async-storage';

export const login = ({email, password, type}) => {
  return generalAxios.post(Apis.SIGN_IN, {
    email,
    password,
    type,
  });
};

export const getToken = () => {
  return AsyncStorage.getItem('_token');
};

export const setType = (type) => {
  return AsyncStorage.setItem('_type', type);
};

export const getType = () => {
  return AsyncStorage.getItem('_type');
};

export const setToken = (token) => {
  return AsyncStorage.setItem('_token', token);
};

export const check = (token, type) => {
  return generalAxios.get(
    type == UserType.MERCHANT ? Apis.CHECK_TOKEN_MERCHANT : CHECK_TOKEN,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const register = (data) => {
  return generalAxios({
    method: 'post',
    url: Apis.REGISTER,
    data,
  });
};

export const logout = () => {
  return AsyncStorage.removeItem('_token');
};
