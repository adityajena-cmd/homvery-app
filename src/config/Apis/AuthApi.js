import axios from 'axios';
import urlConfig from '../config.json';


// {{endpoint}}/api/register/customer
const loginTechinician = (body) => {
    return axios.post(urlConfig.baseURL + '/auth/login', body);
  };

// {{endpoint}}/auth/validate
const validateOtp = (body) => {
    return axios.post(urlConfig.baseURL + '/auth/validate', body);
  };


  export {
    loginTechinician as Login,
    validateOtp as CheckOTP
  };