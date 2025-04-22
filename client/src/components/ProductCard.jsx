import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/product/${product.id}`); // Navigate to the product details page with the product ID
    };

    return (
        <div className="w-60 h-80 bg-gray-100 dark:bg-gray-800 p-3 flex flex-col gap-2 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-md dark:hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-shadow duration-300">
            {/* Product Image */}
            <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-3 flex-grow">
                <span className="text-xl font-bold text-gray-800 dark:text-gray-50 overflow-hidden text-ellipsis line-clamp-2">
                    {product.name}
                </span>
                {product.condition && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        {product.condition} ({product.years} years)
                    </p>
                )}
                <div className="flex flex-row justify-between items-center mt-auto">
                    <span className="font-bold text-red-600 dark:text-red-500">
                        ₹{product.price}
                    </span>
                    <button
                        onClick={handleViewDetails}
                        className="hover:bg-sky-700 bg-sky-800 text-gray-50 py-1 px-3 rounded-md transition-colors duration-300 text-sm cursor-pointer"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
