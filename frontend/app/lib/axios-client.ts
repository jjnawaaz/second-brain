import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    timeout: 5000
})