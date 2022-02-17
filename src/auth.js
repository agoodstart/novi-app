import { createContext, useContext, useState } from "react";
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext(null);

axios.interceptors.response.use((res) => {
    console.log(res);
    return res;
})


axios.interceptors.request.use((req) => {
    console.log(req);
    return req;
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async credentials => {
        const response = await fetch('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        let data = await response.json();

        if (response.status === 200) {
            let decoded = jwt_decode(data.accessToken)
            console.log(decoded);
            setUser(data);
            console.log(data)
        } else if (response.status === 401) {
            console.log(response);
            console.log('Gegevens onjuist, of het account is nog niet geregistreerd. Probeer het opnieuw, of maak een account aan.');
        }
    }

    const logout = () => {
        setUser(null);
    }

    const register = () => {
        
    }

    return (
        <AuthContext.Provider value={{ user, login, logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}