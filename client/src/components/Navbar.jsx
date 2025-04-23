import { Link } from "react-router-dom";
import { User } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { auth } = useAuth();
    const { token } = auth;

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
                        <Link
                            to="/profile"
                            className="flex items-center text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 font-bold"
                        >
                            <User size={20} className="mr-2" />
                            Profile
                        </Link>
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
