import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:80',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

export default request