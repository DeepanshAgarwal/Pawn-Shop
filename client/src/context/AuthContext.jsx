import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        try {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                const decoded = jwtDecode(storedToken);
                if (decoded.exp * 1000 > Date.now()) {
                    return storedToken;
                } else {
                    localStorage.removeItem("token");
                }
            }
        } catch (error) {
            console.error(
                "Error accessing localStorage or decoding token:",
                error
            );
        }
        return "";
    });

    const saveToken = (newToken) => {
        try {
            setToken(newToken);
            localStorage.setItem("token", newToken);
        } catch (error) {
            console.error("Error saving token to localStorage:", error);
        }
    };

    const removeToken = () => {
        try {
            setToken("");
            localStorage.removeItem("token");
        } catch (error) {
            console.error("Error removing token from localStorage:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ auth: { token, saveToken, removeToken } }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
