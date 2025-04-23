import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const { auth } = useAuth();
    const { token, removeToken } = auth;
    const navigate = useNavigate();

    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        removeToken(); // Remove token from context and localStorage
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                >
                    PawnShop
                </Link>

                {/* Links Section */}
                <div className="hidden md:flex flex-1 justify-center items-center gap-6">
                    <Link
                        to="/products"
                        className="text-gray-800 hover:text-blue-500 dark:text-white dark:hover:text-blue-400 font-medium"
                    >
                        All Products
                    </Link>
                    <Link
                        to="/sell"
                        className="text-gray-800 hover:text-blue-500 dark:text-white dark:hover:text-blue-400 font-medium"
                    >
                        Sell Products
                    </Link>
                </div>

                {/* Dark Mode Toggle and Profile Section */}
                <div className="flex items-center gap-6">
                    <DarkModeToggle />
                    {token ? (
                        <div className="relative" ref={userMenuRef}>
                            {/* User Icon */}
                            <button
                                className="flex items-center text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 font-bold"
                                onClick={toggleUserMenu}
                            >
                                <User size={20} className="mr-2" />
                                Profile
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-10">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/listed"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Products Listed
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="text-gray-800 hover:text-blue-500 dark:text-white dark:hover:text-blue-400 font-medium"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
