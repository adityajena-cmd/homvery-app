import axios from 'axios';
import urlConfig from '../config.json';


// {{endpoint}}/api/register/customer
const loginCustomer = (body) => {
    return axios.post(urlConfig.baseURL + '/auth/login', body);
  };

// {{endpoint}}/auth/validate
const validateOtp = (body) => {
    return axios.post(urlConfig.baseURL + '/auth/validate', body);
  };


  export {
    loginCustomer as Login,
    validateOtp as CheckOTP
  };