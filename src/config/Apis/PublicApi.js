import axios from 'axios';
import urlConfig from '../config.json';



const GetCities = (keyword) => {
    return axios.get(urlConfig.baseURL + `/locations?name_contains=${keyword}`);
};
const GetServices = (catID = null) => {
    if (catID) {
        return axios.get(urlConfig.baseURL + `/services?category.id=${catID}`);

    } else {
        return axios.get(urlConfig.baseURL + `/services`);

    }
};
const GetCategories = () => {
    return axios.get(urlConfig.baseURL + `/categories`);
};

const GetInventory = (serviceId, city) => {

    return axios.get(urlConfig.baseURL + `/inventories?service.id=${serviceId}&city.name=${city}&active=true`);
};

const GetReviews = (serviceId) => {

    return axios.get(urlConfig.baseURL + `/servicereviews?serviceId=${serviceId}`);
};


export {
    GetCities,
    GetCategories,
    GetServices,
    GetInventory,
    GetReviews

}