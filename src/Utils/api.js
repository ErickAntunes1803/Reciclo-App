import axios from 'axios';
import KEY from './Constants';


export const geolocation = axios.create({
    baseURL: `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY.GEO_KEY}&location=`,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  export const auth = axios.create({
    baseURL: KEY.BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
    }
    });

   const api = axios.create({
    baseURL: KEY.BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
    }

  });
  export default api;