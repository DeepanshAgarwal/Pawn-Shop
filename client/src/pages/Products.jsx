import React, { useState } from "react";
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
            <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CategoryFilter
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                />
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
