import axios from "axios";


export const axiosClient = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
    timeout: 5000
})