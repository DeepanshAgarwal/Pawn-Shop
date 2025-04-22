import React, { useState } from "react";

const Login = () => {
    const [type, setType] = useState("login"); // State to toggle between login and signup
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "male", // Default gender value for signup
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., call an API or validate)
        console.log(formData);
    };

    const handleForgotPassword = () => {
        // Handle forgot password logic here (e.g., redirect to reset password page)
        alert("This feature hasn't been implemented yet");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    {type === "signup" ? "Sign Up" : "Login"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    {type === "signup" && (
                        <div className="flex space-x-4 mb-4">
                            <input
                                name="firstName"
                                placeholder="First Name"
                                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                name="lastName"
                                placeholder="Last Name"
                                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <input
                        name="email"
                        placeholder="Email"
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {type === "login" && (
                        <button
                            type="button"
                            className="text-sm text-blue-500 hover:underline self-end mb-4"
                            onClick={handleForgotPassword}
                        >
                            Forgot Password?
                        </button>
                    )}
                    {type === "signup" && (
                        <>
                            <label
                                className="text-sm mb-2 text-gray-800 dark:text-gray-200"
                                htmlFor="gender"
                            >
                                Gender
                            </label>
                            <select
                                name="gender"
                                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                id="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </>
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
                    >
                        {type === "signup" ? "Sign Up" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
