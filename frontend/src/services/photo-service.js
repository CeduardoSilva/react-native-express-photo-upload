import {SPACE_URL, SERVER_URL} from '../shared/constants';

export const uploadPhoto = (photo, filename) => {
  return new Promise((resolve, reject) => {
    fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      body: createFormData(photo, filename),
    })
      .then(response => {
        let responseJson = response.json();
        console.log(responseJson);
        resolve(`${SPACE_URL}/${filename}`);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const createFormData = (photo, filename, body = {}) => {
  const data = new FormData();

  data.append('upload', {
    name: filename,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};
