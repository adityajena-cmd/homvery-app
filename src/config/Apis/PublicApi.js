import axios from 'axios';
import urlConfig from '../config.json';



const GetCities = (keyword) => {
    return axios.get(urlConfig.baseURL + `/locations?name_contains=${keyword}&active=true`);
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

const GetTopSliders = () => {

    return axios.get(urlConfig.baseURL + `/sliders?_sort=order:ASC&type=HOMEPAGETOP&active=true`);
};

const GetVideoSliders = () => {

    return axios.get(urlConfig.baseURL + `/sliders?_sort=order:ASC&type=VIDEOS&active=true`);
};

const GetLocalAdSliders = () => {

    return axios.get(urlConfig.baseURL + `/sliders?_sort=order:ASC&type=LOCALADS&active=true`);
};


export {
    GetCities,
    GetCategories,
    GetServices,
    GetInventory,
    GetReviews,
    GetLocalAdSliders,
    GetVideoSliders,
    GetTopSliders

}