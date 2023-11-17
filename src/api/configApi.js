import axios from "axios";

export const configApi = axios.create({
    baseURL: 'https://stockmaster-ut39.onrender.com'
});