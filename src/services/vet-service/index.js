import {authAxios} from 'utils/axios';
import {Apis} from '@constant';

export const getAll = ({page = 1, order = ''}) => {
  return authAxios({
    method: 'get',
    url: `${Apis.VET_SERVICE_ALL}?page=${page}&order=${order}`,
  });
};
export const get = (id) => {
  return axios({
    method: 'get',
    url: `${Apis.VET_SERVICE_ALL}/${id}`,
    config: {
      headers: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjciLCJlbWFpbCI6InBuamlrcm5hQGdtYWlsLmNvbSIsImlhdCI6MTU5MzYxNDk1OSwiZXhwIjoxNTkzNzAxMzU5fQ.kotrhxx22W7dmYWSOBUgBMpkxf9cdI_kwlGj0TkCXG0',
      },
    },
  });
};
