import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Hero Section */}
            <section className="text-center py-20">
                <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                    Welcome to PawnShop
                </h1>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                    Buy, Sell, or Pawn your items with ease.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <Link
                        to="/products"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                        Browse Products
                    </Link>
                    <Link
                        to="/sell"
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400"
                    >
                        Sell Products
                    </Link>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 px-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
                    Featured Products
                </h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Featured Product Item 1 */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Product"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                            Product 1
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            A brief description of the product.
                        </p>
                        <Link
                            to="/product-detail"
                            className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            View Details
                        </Link>
                    </div>
                    {/* Featured Product Item 2 */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Product"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                            Product 2
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            A brief description of the product.
                        </p>
                        <Link
                            to="/product-detail"
                            className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            View Details
                        </Link>
                    </div>
                    {/* Featured Product Item 3 */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Product"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                            Product 3
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            A brief description of the product.
                        </p>
                        <Link
                            to="/product-detail"
                            className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
                <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
                    How It Works
                </h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="text-center p-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Step 1
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Browse through a wide range of products available.
                        </p>
                    </div>
                    {/* Step 2 */}
                    <div className="text-center p-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Step 2
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Choose the product you want to buy, pawn, or sell.
                        </p>
                    </div>
                    {/* Step 3 */}
                    <div className="text-center p-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Step 3
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Complete the transaction with ease and security.
                        </p>
                    </div>
                </div>
            </section>

            {/* Additional Browse and Sell Products Buttons */}
            <div className="text-center py-8 text-xl pt-12 flex justify-center gap-4">
                <Link
                    to="/products"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                    Browse Products
                </Link>
                <Link
                    to="/sell"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400"
                >
                    Sell Products
                </Link>
            </div>
        </div>
    );
};

export default Home;
