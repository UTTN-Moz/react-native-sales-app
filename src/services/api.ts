import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMwNDM3NDU5LCJleHAiOjE2MzMwMjk0NTl9.Oa289VEMG4xvlWQlvZEpMQlkvnSJaXxYpxtGikIZ1OE"
const api = axios.create({
    baseURL: 'https://strapi-sales-api.herokuapp.com'
});

api.defaults.headers['Authorization'] = `Bearer ${token}`;

export default api;