import axios from 'axios';
const { REACT_APP_AUTH_URL } = process.env;

const novi = axios.create({
    baseURL: REACT_APP_AUTH_URL
});

novi.interceptors.response.use(
    res => res.data,
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

class AuthService {
    signInWithUsernameAndPassword(credentials) {
        return novi.post('/auth/signin', credentials).then(
            data => Promise.resolve(data),
            err => Promise.reject(err)
        )
    }

    signOut() {
        // This function won't do anything regarding the api
        return Promise.resolve('Logging out...');
    }
    
    createUserWithUsernameEmailAndPassword(credentials) {
        return novi.post('/auth/signup', credentials).then(
            data => Promise.resolve(data),
            err => Promise.reject(err)
        )
    }
}

export default new AuthService();