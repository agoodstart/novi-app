import { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import useLocalStorage from './useLocalStorage';
const { REACT_APP_AUTH_URL } = process.env;

const novi = axios.create({
    baseURL: REACT_APP_AUTH_URL
});

novi.interceptors.response.use(
    res => {
        return res.data;
    },
    err => {
        const status = err.response?.status || 500;

        switch (status) {
            case 401: {
                return Promise.reject('Authentication Error');
            }

            case 403: {
                return Promise.reject('Permission Error');
            }

            case 405: {
                return Promise.reject('Method not allowed');
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

export default function useProvideAuth() {
    const [user, setUser] = useLocalStorage("user", null);

    useEffect(() => {
    //   console.log('user is logged in: ', user)
    }, [user])

    const testConnection = () => {
        console.log('testing api connection...')
        return novi.get('test/all')
            .then(() => {
                console.log('API connection successfull')
            }, () => {
                console.log('cannot connect to api')
            })
    }

    const signin = (credentials) => {
        return novi.post('/auth/signin', credentials)
            .then(data => {
                const decoded = jwt_decode(data.accessToken);
                console.log(decoded);
                const user = {
                    username: decoded.sub,
                    accessToken: data.accessToken,
                }
                setUser(user)
                return;
            },
            err => {
                return Promise.reject(err);
            })
    }
    const signup = (credentials) => {
        return novi.post('/auth/signup', credentials)
            .then(data => {
                console.log(data);
                return data;
            },
            err => {
                console.log(err);
                return Promise.reject(err);
            })
    }

    return {
        user,
        testConnection,
        signin,
        signup,
    }
}