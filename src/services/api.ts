import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxODE4NjU4LCJleHAiOjE2MzQ0MTA2NTh9.vxSW2tjKtSnbjsbJDE3ruGSSJWU1oHNNg0eVuP501Es"
const api = axios.create({
    baseURL: 'https://strapi-sales-api.herokuapp.com'
});

api.defaults.headers['Authorization'] = `Bearer ${token}`;

export default api;