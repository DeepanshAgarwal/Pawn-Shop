import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import validator from "validator";

// Register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if ([name, email, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        // Validate email format
        if (!validator.isEmail(email)) {
            return res
                .status(400)
                .json({ message: "Please provide a valid email" });
        }

        // Validate password (minimum 8 characters, must contain letters and numbers)
        if (!validator.isLength(password, { min: 8 })) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
            });
        }
        if (
            !validator.matches(
                password,
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&\-_.,;:!(){}[\]<>|^&+=~`]{8,}$/
            )
        ) {
            return res.status(400).json({
                message:
                    "Password must contain at least one letter and one number",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(401)
                .json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res
                .status(401)
                .json({ message: "Invalid email or password" });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};

export const updateUserProfile = async (req, res) => {
    const { name, email, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id); // Fetch the full user object, including the password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email is already taken by another user
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res
                    .status(400)
                    .json({ message: "Email already in use" });
            }
        }

        // Update password if provided
        if (oldPassword && newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Old password is incorrect" });
            }

            if (newPassword.length < 8) {
                return res.status(400).json({
                    message: "New password must be at least 8 characters long",
                });
            }

            // Hash new password before saving
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        // Update user profile fields
        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};
