import axios from 'axios';
import {Apis} from '@constant';

export const login = ({email, password, type}) => {
  return axios({
    method: 'post',
    url: Apis.SIGN_IN,
    data: {
      email,
      password,
      type,
    },
  });
};
export const register = ({email, password, type}) => {
  return axios({
    method: 'post',
    url: Apis.REGISTER,
    data: {
      email,
      password,
      type,
    },
  });
};
