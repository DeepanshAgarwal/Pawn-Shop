import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

//public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

//protected routes
router.post("/create", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
