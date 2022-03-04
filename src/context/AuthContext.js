import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [signInModalIsOpen, setSignInModalIsOpen] = useState(false)

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    const toggleSignInModal = (toggle) => {
        setSignInModalIsOpen(toggle);
    }

    const login = (credentials) => {
        return AuthService.login(credentials)
            .then(data => {
                // setAccessToken(data.accessToken)
                // setUser(jwt_decode(data.accessToken))
                return Promise.resolve('Login succeeded')
            }, 
            errorStatus => {
                return Promise.reject(errorStatus);
            })
    }

    const logout = () => {
        setAccessToken(null);
        setUser(null);
    }

    const register = (credentials) => {
        return AuthService.register(credentials)
            .then(_data => {
                
                return Promise.resolve('Registration success');
            },
            errorStatus => {
                return Promise.reject(errorStatus);
            })
    }

    useEffect(() => {
        console.log('signinmodal toggled');
    }, [signInModalIsOpen])

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
          <AuthContext.Provider value={{ user, accessToken, signInModalIsOpen, toggleSignInModal, login, register, logout}}>
              {children}
          </AuthContext.Provider>
      )
};

export const useAuth = () => {
    return useContext(AuthContext);
}