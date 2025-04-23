import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [type, setType] = useState("login"); // State to toggle between login and signup
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [loading, setLoading] = useState(false); // Add loading state
    const { auth } = useAuth();
    const { token, saveToken } = auth;
    const navigate = useNavigate();
    const location = useLocation();

    // Get the redirect path from state or default to "/"
    const from = location.state?.from?.pathname || "/";

    // Redirect to the intended page if token is already available
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const endpoint =
                type === "signup"
                    ? `${import.meta.env.VITE_BACKEND_URL}/api/users/register`
                    : `${import.meta.env.VITE_BACKEND_URL}/api/users/login`;

            const { data } = await axios.post(endpoint, formData);
            saveToken(data.token); // Save token to context and localStorage
            toast.success(
                `${type === "signup" ? "Sign Up" : "Login"} successful!`
            );
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                    "An error occurred. Please try again."
            );
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleForgotPassword = () => {
        toast.info("This feature hasn't been implemented yet.");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    {type === "signup" ? "Sign Up" : "Login"}
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col relative"
                >
                    {type === "signup" && (
                        <input
                            name="name"
                            placeholder="Name"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        name="email"
                        placeholder="Email"
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="relative mb-2">
                        <input
                            name="password"
                            placeholder="Password"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                            type={showPassword ? "text" : "password"} // Toggle input type
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-500 dark:text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {type === "login" && (
                        <button
                            type="button"
                            className="text-sm text-blue-500 hover:underline self-end mb-4"
                            onClick={handleForgotPassword}
                        >
                            Forgot Password?
                        </button>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                        {type === "signup" ? (
                            <>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="text-blue-500 hover:underline"
                                    onClick={() => setType("login")}
                                >
                                    Login
                                </button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    className="text-blue-500 hover:underline"
                                    onClick={() => setType("signup")}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </p>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md mt-6 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
                        type="submit"
                        disabled={loading} // Disable button when loading
                    >
                        {loading
                            ? "Processing..."
                            : type === "signup"
                            ? "Sign Up"
                            : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
