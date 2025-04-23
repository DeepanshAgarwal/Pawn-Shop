import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Sell = () => {
    const initialFormData = {
        image: null,
        name: "",
        description: "",
        price: "",
        condition: "Used",
        usageNumber: "",
        usageUnit: "years",
        category: "Furniture", // Default category
        sellerName: "",
        email: "",
        phone: "",
        hostel: "",
        room: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleRemoveImage = () => {
        setFormData({ ...formData, image: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error("Please upload an image.");
            return;
        }

        if (
            formData.condition === "Used" &&
            (!formData.usageNumber || !formData.usageUnit)
        ) {
            toast.error(
                "Please provide usage duration and unit for used items."
            );
            return;
        }

        setLoading(true);

        try {
            // Prepare form data for submission
            const data = new FormData();
            data.append("image", formData.image);
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("condition", formData.condition);
            if (formData.condition === "Used") {
                data.append(
                    "usageDuration",
                    JSON.stringify({
                        value: formData.usageNumber,
                        unit: formData.usageUnit,
                    })
                );
            }
            data.append("category", formData.category);
            data.append(
                "seller",
                JSON.stringify({
                    name: formData.sellerName,
                    email: formData.email,
                    phone: formData.phone,
                    hostel: formData.hostel,
                    room: formData.room,
                })
            );

            // Make API request to create a product
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/create`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Product listed successfully!");
                navigate("/products"); // Redirect to products page
            } else {
                toast.error(
                    response.data.message || "Failed to list the product."
                );
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to list the product."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex justify-center items-center p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl space-y-4"
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    List an Item for Sale
                </h2>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                        Product Image
                    </label>
                    {formData.image ? (
                        <div className="flex flex-col items-center gap-2">
                            <img
                                src={URL.createObjectURL(formData.image)}
                                alt="Uploaded"
                                className="w-32 h-32 object-cover rounded-md shadow-md"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 text-sm"
                            >
                                Remove Image
                            </button>
                        </div>
                    ) : (
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md w-full"
                            required
                        />
                    )}
                </div>

                {/* Product Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md w-full"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md w-full"
                        required
                    />
                </div>

                {/* Condition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                            Condition
                        </label>
                        <select
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md w-full"
                            required
                        >
                            <option value="New">New</option>
                            <option value="Almost New">Almost New</option>
                            <option value="Used">Used</option>
                        </select>
                    </div>
                    {formData.condition === "Used" && (
                        <div className="flex gap-2 items-center">
                            <div className="w-1/2">
                                <label className="hidden md:block text-sm mb-1 text-gray-700 dark:text-gray-300">
                                    Duration
                                </label>
                                <input
                                    type="number"
                                    name="usageNumber"
                                    placeholder="Duration"
                                    value={formData.usageNumber}
                                    onChange={handleChange}
                                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md w-full"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="hidden md:block text-sm mb-1 text-gray-700 dark:text-gray-300">
                                    Unit
                                </label>
                                <select
                                    name="usageUnit"
                                    value={formData.usageUnit}
                                    onChange={handleChange}
                                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md w-full"
                                    required
                                >
                                    <option value="days">Days</option>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md w-full"
                        required
                    >
                        <option value="Furniture">Furniture</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Books">Books</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Seller Info */}
                <h3 className="text-lg font-semibold mt-4 text-gray-800 dark:text-gray-200">
                    Seller Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="sellerName"
                        placeholder="Your Name"
                        value={formData.sellerName}
                        onChange={handleChange}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="hostel"
                        placeholder="Hostel Name"
                        value={formData.hostel}
                        onChange={handleChange}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="room"
                        placeholder="Room Number"
                        value={formData.room}
                        onChange={handleChange}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md"
                        required
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-150 py-2 px-4 rounded-md font-bold mt-4 w-full"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? "Submitting..." : "Submit Item"}
                </button>
            </form>
        </div>
    );
};

export default Sell;
