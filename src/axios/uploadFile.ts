import api from './api';

export async function uploadFile(pickerResponse: any): Promise<any> {
  const formData = new FormData();
  var file = {
    uri: pickerResponse.uri,
    type: pickerResponse.type,
    name: pickerResponse.name,
  };
  formData.append('keyForFileObject', JSON.parse(JSON.stringify(file)));
  const response = await api.post('/upload', formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return response.data.url;
}
