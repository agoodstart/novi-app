import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async userIn => {
        const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', 
        {
            username: userIn.username,
            password: userIn.password
        });

        console.log(response.data);

        setUser(response.data);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}