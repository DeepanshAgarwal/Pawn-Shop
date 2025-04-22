import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDescription = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching product details (replace with actual API call)
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // Replace this with your actual API call
                const response = await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve({
                            id,
                            name: "Sample Product",
                            image: "/laptop.jpeg",
                            price: 1000,
                            condition: "New",
                            usage: "1 year",
                            description:
                                "This is a sample product description.",
                            sellerName: "John Doe",
                            sellerEmail: "john.doe@example.com",
                            sellerPhone: "+1234567890",
                            hostelName: "Hostel A",
                            roomNumber: "101",
                        });
                    }, 1000)
                );
                setProduct(response);
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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Loading product details...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Product details are not available.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex justify-center">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-10">
                {/* Images Section */}
                <div className="w-full md:w-1/2">
                    <img
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name || "Product Image"}
                        className="w-full h-80 object-cover rounded-lg shadow"
                    />
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">
                        {product.name || "Unnamed Product"}
                    </h1>
                    <p className="text-2xl text-red-500 font-semibold">
                        ₹{product.price || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {product.description || "No description provided."}
                    </p>

                    {/* Condition */}
                    {product.condition && (
                        <div>
                            <h3 className="font-semibold text-lg">Condition</h3>
                            <p>
                                {product.condition} - Used for{" "}
                                {product.usage || "N/A"}
                            </p>
                        </div>
                    )}

                    {/* Seller Details */}
                    <div className="mt-4">
                        <h3 className="font-semibold text-lg">
                            Seller Information
                        </h3>
                        <p>
                            <span className="font-medium">Name:</span>{" "}
                            {product.sellerName || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span>{" "}
                            {product.sellerEmail || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium">Phone:</span>{" "}
                            {product.sellerPhone || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium">Hostel:</span>{" "}
                            {product.hostelName || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium">Room No.:</span>{" "}
                            {product.roomNumber || "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;
