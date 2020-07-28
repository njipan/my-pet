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

export const getUser = async () => {
  const parse = JSON.parse(await AsyncStorage.getItem('_user'));
  return parse.user || parse;
};

export const setUser = (data) => {
  return AsyncStorage.setItem('_user', JSON.stringify(data));
};

export const check = async (token, type) => {
  const response = await generalAxios.get(
    type == UserType.MERCHANT ? Apis.CHECK_TOKEN_MERCHANT : Apis.CHECK_TOKEN,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  setUser(response.data.data);
};

export const register = (data) => {
  return generalAxios({
    method: 'post',
    url: Apis.REGISTER,
    data,
  });
};

export const logout = async () => {
  await AsyncStorage.removeItem('_token');
  await AsyncStorage.removeItem('_type');
  await AsyncStorage.removeItem('_user');
};
