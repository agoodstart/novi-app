import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
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
            setAccessToken(token)
            setUser(jwt_decode(token));
        } else if (response.status === 401) {
            console.log('Gegevens onjuist, of het account is nog niet geregistreerd. Probeer het opnieuw, of maak een account aan.');
        }
    }

    const logout = () => {
        setAccessToken(null);
        setUser(null);
    }

    const register = () => {
        
    }

    useEffect(() => {
      if(accessToken) {
          console.log('authtoken set')
          console.log(accessToken);
          console.log(user.sub);
      } else{
          console.log('authtoken not set yet')
      }
    }, [user])
    

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}