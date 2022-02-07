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

const GetBookings = (userId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/bookingstatusmaps?bookingid.createdby=${userId}&_sort=created_at:DESC`, header);
};

const GetTechinicianServices = (techID, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/technicianservicesmaps?technicianuser.id=${techID}`, header);
};

const GetBillingDetails = (token, bookingId) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + '/billingdetails?bookingId=' + bookingId, header);
};
const GetBookingStatus = (bookingId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/bookingstatusmaps?bookingid=${bookingId}&_sort=created_at:DESC`, header);
};
const CreateBooking = (body, token) => {
    const header = getUserToken(token);

    return axios.post(urlConfig.baseURL + `/saveBooking`, body,header);
};
const GetOffers = (bookingId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/eligibleoffers?bookingId=${bookingId}`, header);
};
export {
    GetBookings,
    GetTechinicianServices,
    GetBillingDetails,
    GetBookingStatus,
    CreateBooking,
    GetOffers
}