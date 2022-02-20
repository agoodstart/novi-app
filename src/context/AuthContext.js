import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = (credentials) => {
        return AuthService.login(credentials)
            .then(data => {
                console.log(data)
                return Promise.resolve('Login succeeded')
                // setAccessToken(data.accessToken)
                // setUser(jwt_decode(data.accessToken))
            }, 
            errorStatus => {
                return Promise.reject(errorStatus);
            })
    }

    const logout = () => {
        setAccessToken(null);
        setUser(null);
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
};

export const useAuth = () => {
    return useContext(AuthContext);
}