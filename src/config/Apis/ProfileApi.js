import axios from 'axios';
import urlConfig from '../config.json';

const getUserToken = (token, isMultipart = false) => {
    if (isMultipart) {
      return {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      };
    }
    return {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
  };
const GetUserDeatils = (userId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/users/${userId}`, header);
};
const UpdateUserDeatils = (userId, token, body) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/users/${userId}`, body, header);
};


const GetAllLinks = (token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + '/settings', header);

}

const ContactUs = (token, body) => {
    const header = getUserToken(token);

    return axios.post(urlConfig.baseURL + `/contact`, body, header);
};


const UploadProfile = (token, formData) => {
    const header = getUserToken(token, true);

    return axios.post(urlConfig.baseURL + '/upload', formData, header);
};

const UpdateUser = (userId, token, formData) => {
    const header = getUserToken(token, true);

    return axios.put(urlConfig.baseURL + '/users/' + userId, formData, header);
};

const UpdateUserAddress = (userId, token, body) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + '/users/' + userId, body, header);
};

export {
    GetUserDeatils,
    UpdateUserDeatils,
    GetAllLinks,
    ContactUs as ContactHomevery,
    UploadProfile,
    UpdateUser,
    UpdateUserAddress
}