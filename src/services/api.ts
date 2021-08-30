import axios from 'axios';

const token = "AsxshghddhseyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMwMzQzNTY4LCJleHAiOjE2MzI5MzU1Njh9.de3uIvOF3CLArYP-1Jb43RWrX1cSSkgFx-f86uX5Bfg"
const api = axios.create({
    baseURL: 'https://strapi-sales-api.herokuapp.com'
});

api.defaults.headers['Authorization'] = `Bearer ${token}`;

export default api;