import { createContext, useContext, useState, useEffect, useRef } from "react";
import useProvideAuth from "../hooks/useProvideAuth";
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const modalRef = useRef();
    const auth = useProvideAuth();

    // const [accessToken, setAccessToken] = useState(null);
    // const [user, setUser] = useState(null);
      
  
      return (
          <AuthContext.Provider value={{ modalRef, auth}}>
              {children}
          </AuthContext.Provider>
      )
};