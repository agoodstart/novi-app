import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = async credentials => {
        const response = await fetch('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        let token = (await response.json()).accessToken;

        if (response.status === 200) {
            console.log(token);
            console.log(jwt_decode(token));
            setAuthToken(token)
            setUser(jwt_decode(token));
        } else if (response.status === 401) {
            console.log(response);
            console.log('Gegevens onjuist, of het account is nog niet geregistreerd. Probeer het opnieuw, of maak een account aan.');
        }
    }

    const logout = () => {
        setAuthToken(null);
        setUser(null);
    }

    const register = () => {
        
    }

    useEffect(() => {
      if(authToken) {
          console.log('authtoken set')
          console.log(authToken);
          console.log(user);
      } else{
          console.log('authtoken not set yet')
      }
    }, [authToken])
    

    return (
        <AuthContext.Provider value={{ user, authToken, login, logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}