import {getRefreshToken, saveAccessToken} from '../async_storage/asyncStorage';
import {default as api, default as instance} from './api';

export async function uploadFile(pickerResponse: any): Promise<any> {
  const formData = new FormData();
  var file = {
    uri: pickerResponse.uri,
    type: pickerResponse.type,
    name: pickerResponse.name,
  } as any;
  formData.append('keyForFileObject', file);

  //getting new accessToken data
  const response = await instance.post('/token', {
    refreshToken: await getRefreshToken(),
  });
  const {accessToken} = response.data;
  await saveAccessToken(accessToken);

  //sending upload request
  const responseAfterUpload = await api.post('/upload', formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return responseAfterUpload.data.url;
}
