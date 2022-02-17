import axios from "axios";
import jwt_decode from 'jwt-decode';
import dayjs from "dayjs";

const baseURL = 'https://frontend-educational-backend.herokuapp.com/api';

const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: `Bearer `}
})

export default axiosInstance;