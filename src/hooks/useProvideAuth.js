import { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import useLocalStorage from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

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
                console.log(err.response);
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
    const navigate = useNavigate();
    
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

    const signout = () => {
        setUser(null);
        navigate('/')
    }

    const signup = (credentials) => {
        const json = JSON.stringify(credentials);
        return novi.post('/auth/signup', json, {
            headers: {
              'Content-Type': 'application/json'
            }})
            .then(data => {
                console.log(data);
                return data;
            },
            err => {
                console.log(err);
                return Promise.reject(err);
            })
    }

    const profile = (accessToken) => {
        return novi.get('/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data => {
            return data;
        },
        err => {
            return Promise.reject(`Unable to receive profile information, following error: \n ${err}`);
        })
    }

    const all = (accessToken) => {
        return novi.get('/admin/all', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data => {
            return data;
        },
        err => {
            return Promise.reject(`Unable to receive all users, following error: \n ${err}`)
        })
    }

    const update = (accessToken, data) => {
        return novi.put('/user', data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data => {
            return data
        },
        err => {
            return Promise.reject(`Unable to update profile information, following error: \n ${err}`)
        })
    }

    return {
        user,
        testConnection,
        signin,
        signout,
        signup,
        profile,
        all,
        update
    }
}