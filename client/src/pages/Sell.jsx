import React, { useState } from "react";

const Sell = () => {
    const initialFormData = {
        image: null,
        name: "",
        description: "",
        price: "",
        condition: "Used",
        usageNumber: "",
        usageUnit: "years",
        sellerName: "",
        email: "",
        phone: "",
        hostel: "",
        room: "",
    };

    const [formData, setFormData] = useState(initialFormData);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", formData);
        // Clear the form after submission
        setFormData(initialFormData);
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
                >
                    Submit Item
                </button>
            </form>
        </div>
    );
};

export default Sell;
