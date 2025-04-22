import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const ProductDescription = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
                );
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Loading product details...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Product details are not available.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                        {product.name || "Unnamed Product"}
                    </h1>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                        Posted on:{" "}
                        {moment(product.createdAt).format("MMMM Do, YYYY")}
                    </span>
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row p-6 gap-8">
                    {/* Image */}
                    <div className="md:w-1/2">
                        <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow">
                            <img
                                src={product.image || "/placeholder.jpg"}
                                alt={product.name || "Product Image"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="md:w-1/2 space-y-5">
                        <p className="text-3xl text-red-600 font-semibold">
                            ₹{product.price || "N/A"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {product.description || "No description provided."}
                        </p>

                        {product.condition && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                                    Condition
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {product.condition} – Used for{" "}
                                    {product.usageDuration?.value}{" "}
                                    {product.usageDuration?.unit}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Seller Info */}
                <div className="px-6 pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        Seller Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                            <span className="font-medium">Name:</span>{" "}
                            {product.seller?.name || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span>{" "}
                            {product.seller?.email || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium">Phone:</span>{" "}
                            {product.seller?.phone || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium">Hostel:</span>{" "}
                            {product.seller?.hostel || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium">Room No.:</span>{" "}
                            {product.seller?.room || "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;
