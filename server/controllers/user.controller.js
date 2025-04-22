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
