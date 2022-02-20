import axios from 'axios';
const { REACT_APP_API_URL } = process.env;

const httpClient = axios.create({
    baseURL: REACT_APP_API_URL
});

httpClient.interceptors.response.use(
    res => {
        console.log(res)
        return res.data
    },
    err => {
        const status = err.response?.status || 500;

        switch (status) {
            case 401: {
                return Promise.reject('auth error')
            }

            case 403: {
                return Promise.reject('permission error')
            }

            default: {
                return Promise.reject(err.response.data)
            }
        }
    }
)
class AuthService {
    login(credentials) {
        return httpClient.post('/auth/signin', credentials)
            .then(data => {
                console.log(data);
                return Promise.resolve(data);
            },
            err => {
                return Promise.reject(err);
            })
    }
    logout() {
        let rememberMe = false;
        if(rememberMe) {
            localStorage.clear();
        }
    }
    register(credentials) {
        return httpClient.post('/auth/signup', credentials)
    }
}

export default new AuthService();