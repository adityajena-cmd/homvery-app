import axios from 'axios';
import urlConfig from '../config.json';



const getPaytmToken = (userId,BookingID,token) =>{
    return axios.get(urlConfig.transaction_url + `/initiateToken/customer?booking=${BookingID}&&id=${userId}&&token=${token}`);
}



export {
    getPaytmToken as getPaytmToken
}