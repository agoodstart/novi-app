import { createContext, useRef } from "react";
import useProvideAuth from "../hooks/useProvideAuth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const modalRef = useRef();
    const auth = useProvideAuth();
  
    return (
        <AuthContext.Provider value={{ modalRef, auth}}>
            {children}
        </AuthContext.Provider>
    )
};