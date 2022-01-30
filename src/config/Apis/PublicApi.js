import axios from 'axios';
import urlConfig from '../config.json';



const GetCities = (keyword) => {
    return axios.get(urlConfig.baseURL + `/locations?name_contains=${keyword}`);
};
const GetServices = (catID=null) => {
    if(catID){
        return axios.get(urlConfig.baseURL + `/services?category.id=${catID}`);

    }else{
        return axios.get(urlConfig.baseURL + `/services`);

    }
};
const GetCategories = () => {
    return axios.get(urlConfig.baseURL + `/categories`);
};

export {
    GetCities,
    GetCategories,
    GetServices,

}