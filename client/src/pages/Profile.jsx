import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Profile = () => {
    const { auth } = useAuth();
    const { token, removeToken } = auth;
    const [userDetails, setUserDetails] = useState({});
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUserDetails(data);
                setUpdatedDetails(data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                toast.error("Failed to load profile.");
            }
        };

        const fetchListings = async () => {
            try {
                const { data } = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/api/products/my-products`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // Sort listings by creation date in descending order
                const sortedListings = data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setListings(sortedListings);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
                toast.error("Failed to load listings.");
            }
        };

        fetchProfile();
        fetchListings();
        setLoading(false);
    }, [token]);

    const handleUpdate = async () => {
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
                updatedDetails,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setUserDetails(data);
            setEditMode(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error("Failed to update profile.");
        }
    };

    const handleChangePassword = async () => {
        try {
            // Send only the password fields to the backend
            const { data } = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
                {
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setPasswords({ oldPassword: "", newPassword: "" });
            toast.success("Password changed successfully!");
        } catch (error) {
            console.error("Failed to change password:", error);
            toast.error(
                error.response?.data?.message || "Failed to change password."
            );
        }
    };

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {/* User Details Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">User Details</h2>
                {editMode ? (
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={updatedDetails.name}
                            onChange={(e) =>
                                setUpdatedDetails({
                                    ...updatedDetails,
                                    name: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={updatedDetails.email}
                            onChange={(e) =>
                                setUpdatedDetails({
                                    ...updatedDetails,
                                    email: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full"
                            placeholder="Email"
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p>
                            <strong>Name:</strong> {userDetails.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {userDetails.email}
                        </p>
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Change Password Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <div className="space-y-4">
                    <input
                        type="password"
                        value={passwords.oldPassword}
                        onChange={(e) =>
                            setPasswords({
                                ...passwords,
                                oldPassword: e.target.value,
                            })
                        }
                        className="border p-2 rounded w-full"
                        placeholder="Old Password"
                    />
                    <input
                        type="password"
                        value={passwords.newPassword}
                        onChange={(e) =>
                            setPasswords({
                                ...passwords,
                                newPassword: e.target.value,
                            })
                        }
                        className="border p-2 rounded w-full"
                        placeholder="New Password"
                    />
                    <button
                        onClick={handleChangePassword}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {/* User Listings Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">My Listings</h2>
                {listings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {listings.map((listing) => (
                            <ProductCard key={listing._id} product={listing} />
                        ))}
                    </div>
                ) : (
                    <p>No listings found.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
