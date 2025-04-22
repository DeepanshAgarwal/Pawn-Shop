import express from "express";
import upload from "../middlewares/multer.middleware.js";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getMyProducts,
} from "../controllers/product.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected routes
router.post("/create", protect, upload.single("image"), createProduct);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);
router.get("/my-products", protect, getMyProducts);

export default router;
