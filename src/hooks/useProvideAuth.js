import { useState, useEffect } from 'react';
import Novi from '../api/services/Auth';
import useLocalStorage from './useLocalStorage';
import jwt_decode from 'jwt-decode';

export default function useProvideAuth() {
    const [user, setUser] = useLocalStorage("user", null);

    useEffect(() => {
    //   console.log('user is logged in: ', user)
    }, [user])

    const testConnection = () => {
        console.log('testing api connection...')
        return Novi.get('test/all')
            .then(() => {
                console.log('API connection successfull')
            }, () => {
                console.log('cannot connect to api')
            })
    }

    const signin = (credentials) => {
        return Novi.post('/auth/signin', credentials)
            .then(data => {
                const decoded = jwt_decode(data)
                const user = {
                    username: decoded.sub,
                    accessToken: data,
                }
                setUser(user)
                return;
            },
            err => {
                return Promise.reject(err);
            })
    }
    const signup = (credentials) => {
        return Novi.post('/auth/signup', credentials)
            .then(data => {
                return data;
            },
            err => {
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