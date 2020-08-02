import generalAxios, {authAxios} from '@util/axios';
import {Apis, UserType} from '@constant';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

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

export const getMerchant = async () => {
  const parse = JSON.parse(await AsyncStorage.getItem('_user'));
  return parse.merchant || {};
};

export const setUser = (data) => {
  return AsyncStorage.setItem('_user', JSON.stringify(data));
};

export const check = async (token, type) => {
  try {
    const response = await generalAxios.get(
      type == UserType.MERCHANT ? Apis.CHECK_TOKEN_MERCHANT : Apis.CHECK_TOKEN,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (err) {
    console.log(err);
  }
};

export const register = (data) => {
  return generalAxios({
    method: 'post',
    url: Apis.REGISTER,
    data,
  });
};

export const getFcmToken = () => {
  return AsyncStorage.getItem('_fcmToken');
};

export const setFcmToken = (token) => {
  AsyncStorage.setItem('_fcmToken', token);
};

export const logout = async () => {
  const fcm = await getFcmToken();
  try {
    const response = await authAxios.post('/users/logout', {token: fcm});
    console.log(response);
  } catch (err) {
    console.log(err.response.data);
  }
  await AsyncStorage.removeItem('_token');
  await AsyncStorage.removeItem('_type');
  await AsyncStorage.removeItem('_user');
  await AsyncStorage.removeItem('_fcmToken');
  await messaging().deleteToken();
  await messaging().unregisterDeviceForRemoteMessages();
};
