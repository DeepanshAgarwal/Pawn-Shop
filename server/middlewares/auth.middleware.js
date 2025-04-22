import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    token = token.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user; // Attach the user to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

export default protect;
