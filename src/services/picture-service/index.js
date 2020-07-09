import {authAxios} from 'utils/axios';
import {Apis} from '@constant';

export const upload = (file) => {
  const formData = new FormData();
  const fileData = {
    name: file.fileName,
    type: file.type,
    uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
  };
  formData.append('file', fileData);

  return authAxios.post(Apis.UPLOAD_PICTURE, formData, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'mulipart/form-data',
    },
  });
};
