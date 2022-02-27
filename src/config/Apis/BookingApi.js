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

    return axios.get(urlConfig.baseURL + `/bookingstatusmaps?_start=0&_limit=30&bookingid.createdby=${userId}&_sort=created_at:DESC`, header);
};
const GetAllBookings = (userId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/bookingstatusmaps?bookingid.createdby=${userId}&_sort=created_at:DESC`, header);
};


const GetBookingsHomePage = (userId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/bookingstatusmaps?_start=0&_limit=4&bookingid.createdby=${userId}&_sort=created_at:DESC`, header);
};

const GetTechinicianServices = (techID, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/techniciandetails?technician=${techID}`, header);
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

const GetAllOffers = (token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + `/offers?fromDate_lte=${new Date().toISOString()}&toDate_gte=${new Date().toISOString()}&newuser=false`, header);
};

const AcceptQuotation = (body, token) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/booking/acceptQuotation`, body, header);
};

const CancelBoking = (body, token) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/booking/cancelBooking`, body, header);
};

const RejectQuotation = (body, token) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/booking/rejectQuotation`, body, header);
};

const UpdatePayment = (body, token) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/booking/paymentCompleted`, body, header);
}

const GiveReview = (body, token, id) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/bookings/` + id, body, header);
}
const CreateReview = (body, token) => {
    const header = getUserToken(token);

    return axios.post(urlConfig.baseURL + `/reviews`, body, header);
}

const GiveDispute = (body, token, id) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + `/bookings/` + id, body, header);
}

const CreateDispute = (body, token) => {
    const header = getUserToken(token);

    return axios.post(urlConfig.baseURL + `/disputes`, body, header);
}

const RescheduleBooking = (token, body) => {
    const header = getUserToken(token);

    return axios.put(urlConfig.baseURL + '/booking/rescheduleBooking', body, header);
};



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
    GiveReview,
    GetAllOffers,
    CancelBoking,
    RescheduleBooking,
    GetBookingsHomePage,
    GetAllBookings, CreateDispute, CreateReview
}