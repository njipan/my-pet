import {authAxios} from '@util/axios';
import * as Apis from './../../constants/api';

export const all = async () => {
  const response = await authAxios.get(Apis.ORDER_ALL);
  return response.data.data;
};

export const get = async (id) => {
  const response = await authAxios.get(`${Apis.ORDER_ALL}/${id}`);
  return response.data.data;
};

export const create = async (data) => {
  const response = await authAxios.post(Apis.ORDER_CREATE, {...data});
  return response.data.data;
};

export const updateStatus = async (order_id, status) => {
  const response = await authAxios.put(Apis.ORDER_UPDATE_STATUS, {
    status,
    order_id,
  });
  return response.data.data;
};

export const createRating = async ({order_id, rating, description}) => {
  const response = await authAxios.post(Apis.ORDER_CREATE_RATING, {
    order_id,
    rating,
    description,
  });
  return response.data.data;
};

export const createTreatment = (order_id, order_pet_id, body) => {
  return authAxios.post(
    `${Apis.ORDER_ALL}/${order_id}/pet/${order_pet_id}/service`,
    {...body},
  );
};

export const updateTreatment = ({order_id, order_pet_id, service_id, qty}) => {
  return authAxios.put(
    `${Apis.ORDER_ALL}/${order_id}/pet/${order_pet_id}/service/${service_id}`,
    {
      qty,
    },
  );
};

export const deleteTreatment = ({order_id, order_pet_id, service_id}) => {
  return authAxios.delete(
    `${Apis.ORDER_ALL}/${order_id}/pet/${order_pet_id}/service/${service_id}`,
  );
};
