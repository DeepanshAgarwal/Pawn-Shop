import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const saveToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const removeToken = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    return (
        <AuthContext.Provider value={{ token, saveToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
