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
const UpdateUserDeatils = (userId, token,body) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/users/${userId}`,body,header);
};





export {
    GetUserDeatils,
    UpdateUserDeatils
}