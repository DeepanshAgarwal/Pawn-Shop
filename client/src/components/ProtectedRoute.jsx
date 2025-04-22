import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        // Redirect to login and pass the current location in state
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render the protected component if authenticated
    return children;
};

export default ProtectedRoute;
