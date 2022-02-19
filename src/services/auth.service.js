import axios from 'axios';
const { REACT_APP_API_URL } = process.env;
class AuthService {
    login(credentials) {
        return axios
            .post(REACT_APP_API_URL + '/auth/signin', credentials)
            .then(response => {

                return response.data;
            });
    }
    logout() {
        let rememberMe = false;
        if(rememberMe) {
            localStorage.clear();
        }
    }
    register() {

    }
}

export default new AuthService();