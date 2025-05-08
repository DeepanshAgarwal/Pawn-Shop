import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6 text-center">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="text-lg text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
