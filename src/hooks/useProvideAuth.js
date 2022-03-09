import { useState } from 'react';
import AuthService from '../api/services/Auth';

export default function useProvideAuth() {
    // const signin = (credentials) => {
    //     return AuthService.login(credentials).then(
    //         data => {
    //             // setAccessToken(data.accessToken)
    //             // setUser(jwt_decode(data.accessToken))
    //             return Promise.resolve('Login succeeded')
    //         }, 
    //         errorStatus => {
    //             return Promise.reject(errorStatus);
    //         })
    // }
    
    // const logout = () => {
    //     setAccessToken(null);
    //     setUser(null);
    // }

    // const register = (credentials) => {
    //     return AuthService.register(credentials)
    //         .then(_data => {
                
    //             return Promise.resolve('Registration success');
    //         },
    //         errorStatus => {
    //             return Promise.reject(errorStatus);
    //         })
    // }

    const signin = (credentials) => {
        return AuthService
            .signInWithUsernameAndPassword(credentials)
            .then(res => {
                return res;
            },
            err => {
                return err;
            })
    }

    const register = (credentials) => {
        return AuthService
            .createUserWithUsernameEmailAndPassword(credentials)
            .then(res => {
                return res;
            },
            err => {
                return err;
            })
    }
}