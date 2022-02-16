import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

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

        // const responseData = await response.json();
        
        // if(responseData)
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