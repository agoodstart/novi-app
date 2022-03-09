import React from "react";
import { useAuth } from "../../auth";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const baseURL = 'https://frontend-educational-backend.herokuapp.com/api';

const useHeader = () => {
    const auth = useAuth();

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${auth?.accessToken}`
        }
    })

    axiosInstance.interceptors.request.use(async req => {
        console.log(auth?.accessToken);
        // const user = jwt_decode(auth)

        return req;
    })
    return axiosInstance;
}

export default useHeader;