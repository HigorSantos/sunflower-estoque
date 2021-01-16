import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout: process.env.REACT_APP_TIMEOUT_API,
    withCredentials: true
});



export default api;
