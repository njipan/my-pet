import {authAxios} from '@util/axios';

const API = '/events';
import {encodeFromBuffer} from '@util/file';

export const get = async (id) => {
  const response = await authAxios.get(`${API}/${id}`);
  try {
    const uri = await encodeFromBuffer(response.data.data.file.data);
    const source = {uri: `data:image/jpeg;base64,${uri}`};
    response.data.data.picture = source;
  } catch (err) {
    response.data.data.picture = null;
  }

  return response.data.data;
};

export const all = async (config = {}) => {
  const response = await authAxios.get(`${API}`);
  return response.data.data;
};
