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

    return axios.get(urlConfig.baseURL + `/bookingstatusmaps?_start=0&_limit=10&bookingid.createdby=${userId}&_sort=created_at:DESC`, header);
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

    return axios.post(urlConfig.baseURL + `/saveBooking`, body, header);
};
const GetOffers = (bookingId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/eligibleoffers?bookingId=${bookingId}`, header);
};
const AcceptQuotation = (body, token) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/booking/acceptQuotation`, body, header);
};
const RejectQuotation = (body, token) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/booking/rejectQuotation`, body, header);
};

const UpdatePayment = (body, token) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/booking/paymentCompleted`, body, header);
}

const GiveReview = (body, token,id) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/bookings/`+id, body, header);
}

const GiveDispute = (body, token,id) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL +  `/bookings/`+id, body, header);
}
export {
    GetBookings,
    GetTechinicianServices,
    GetBillingDetails,
    GetBookingStatus,
    CreateBooking,
    GetOffers,
    AcceptQuotation,
    RejectQuotation,
    UpdatePayment,
    GiveDispute,
    GiveReview
}