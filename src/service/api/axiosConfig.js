import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json", 
    },
});

export { API };