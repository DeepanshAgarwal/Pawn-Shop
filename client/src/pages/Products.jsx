import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const dummyProducts = [
    { id: "1", name: "Long Chair", price: 25.99, category: "Furniture" },
    {
        id: "2",
        name: "Laptop",
        price: 450.0,
        category: "Electronics",
        image: "/laptop.jpeg",
        condition: "Used",
        years: 4,
    },
    { id: "3", name: "Bookshelf", price: 60.5, category: "Furniture" },
    { id: "4", name: "JavaScript Book", price: 20, category: "Books" },
    { id: "5", name: "Headphones", price: 99.99, category: "Electronics" },
    { id: "6", name: "Smartphone", price: 299.99, category: "Electronics" },
    { id: "7", name: "Office Chair", price: 120.0, category: "Furniture" },
    { id: "8", name: "Gaming Mouse", price: 49.99, category: "Electronics" },
    { id: "9", name: "Cookbook", price: 15.0, category: "Books" },
    { id: "10", name: "Desk Lamp", price: 35.0, category: "Furniture" },
];

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = dummyProducts.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
            {filteredProducts.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl justify-items-center">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
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
