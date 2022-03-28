import axios from 'axios';
const { REACT_APP_AUTH_URL } = process.env;

const Novi = axios.create({
    baseURL: REACT_APP_AUTH_URL
});

Novi.interceptors.response.use(
    res => res.data.accessToken,
    err => {
        const status = err.response?.status || 500;

        switch (status) {
            case 401: {
                return Promise.reject('Authentication Error');
            }

            case 403: {
                return Promise.reject('Permission Error');
            }

            case 400: {
                return Promise.reject(err.response.data)
            }

            default: {
                return Promise.reject('Unknown Error occured');
            }
        }
    }
)

export default Novi;