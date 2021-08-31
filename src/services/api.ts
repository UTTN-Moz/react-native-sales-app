import axios from 'axios';

const token = "abjabdbqefbscum+q08erkhc08h+er´0ketc´+qetkc´jweg-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMwNDE4MDIzLCJleHAiOjE2MzMwMTAwMjN9.t5psO3VOAOj_Ijr6gvaDaZZ_BXo_XCUGpfy0eRiEAIo"
const api = axios.create({
    baseURL: 'https://strapi-sales-api.herokuapp.com'
});

api.defaults.headers['Authorization'] = `Bearer ${token}`;

export default api;