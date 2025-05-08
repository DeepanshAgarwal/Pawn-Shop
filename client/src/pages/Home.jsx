import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-[60vh] flex flex-col items-center justify-center">
            {/* Header Section */}
            <header className="text-center py-6">
                <h1 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    Welcome to PawnShop
                </h1>
            </header>

            {/* Main Content Section */}
            <main className="flex flex-col items-center justify-center">
                <p className="text-md text-gray-700 dark:text-gray-300">
                    Buy, Sell, or Pawn your items with ease.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <Link
                        to="/products"
                        className="px-8 py-3 text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                        Browse Products
                    </Link>
                    <Link
                        to="/sell"
                        className="px-8 py-3 text-lg bg-green-600 text-white rounded-lg hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400"
                    >
                        Sell Products
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
