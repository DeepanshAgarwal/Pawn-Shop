import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/products`,
                {
                    params: {
                        search: searchTerm,
                        category: selectedCategory,
                    },
                }
            );
            // Sort products by creation date in descending order
            const sortedProducts = response.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setProducts(sortedProducts);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center p-6">
            {/* Search and Filter Section */}
            <div className="w-full max-w-6xl flex flex-wrap justify-center md:justify-between items-center gap-4 mb-8">
                {/* Search Bar and Sell Button */}
                <div className="flex items-center gap-4">
                    <SearchBar
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow"
                    />
                    <Link
                        to="/sell"
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400 transition-all duration-300 whitespace-nowrap"
                    >
                        Sell
                    </Link>
                </div>

                {/* Category Filter */}
                <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
                    <CategoryFilter
                        selected={selectedCategory}
                        onChange={setSelectedCategory}
                    />
                </div>
            </div>

            {/* Products Grid */}
            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-20 text-lg">
                    Loading products...
                </p>
            ) : products.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl justify-items-center">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-20 text-lg">
                    No products found.
                </p>
            )}
        </div>
    );
};

export default Products;
