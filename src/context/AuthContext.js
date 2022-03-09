import { createContext, useContext, useState, useEffect } from "react";
import useProvideAuth from "../hooks/useProvideAuth";
import AuthService from "../services/auth.service";
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children, modalRef }) => {
    const auth = useProvideAuth();

    // const [accessToken, setAccessToken] = useState(null);
    // const [user, setUser] = useState(null);
      
  
      return (
          <AuthContext.Provider value={{ modalRef, auth}}>
              {children}
          </AuthContext.Provider>
      )
};