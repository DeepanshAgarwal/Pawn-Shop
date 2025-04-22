import Product from "../models/product.model.js";
import { cloudinary } from "../config/cloudinary.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            condition,
            usageDuration,
            category,
            seller,
        } = req.body;

        // Validate required fields
        if (
            !name ||
            !price ||
            !description ||
            !condition ||
            !usageDuration ||
            !category ||
            !seller
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Upload image to Cloudinary
        let imageUrl = null;
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "products" }, (error, result) => {
                        if (error) {
                            reject(new Error("Cloudinary upload failed"));
                        } else {
                            resolve(result);
                        }
                    })
                    .end(req.file.buffer);
            });

            if (!result || !result.secure_url) {
                return res
                    .status(500)
                    .json({ message: "Failed to upload image to Cloudinary" });
            }

            imageUrl = result.secure_url;
        }

        // Parse usageDuration and seller if they are sent as JSON strings
        const parsedUsageDuration = JSON.parse(usageDuration);
        const parsedSeller = JSON.parse(seller);

        // Create a new product
        const product = new Product({
            name,
            price,
            description,
            condition,
            usageDuration: parsedUsageDuration,
            image: imageUrl,
            category,
            seller: parsedSeller,
            listedBy: req.user._id, // Link product to the logged-in user
        });

        const savedProduct = await product.save();
        if (!savedProduct) {
            return res
                .status(500)
                .json({ message: "Failed to save product to the database" });
        }

        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            message: "Something went wrong while creating the product",
        });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        price,
        description,
        condition,
        usageDuration,
        category,
        seller,
    } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.listedBy.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Not authorized to update this product" });
        }

        // Upload new image to Cloudinary if provided
        if (req.file) {
            const result = await cloudinary.uploader
                .upload_stream({ folder: "products" }, (error, result) => {
                    if (error) {
                        throw new Error("Cloudinary upload failed");
                    }
                    return result.secure_url;
                })
                .end(req.file.buffer);
            product.image = result.secure_url;
        }

        // Update fields
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.condition = condition || product.condition;
        product.usageDuration = usageDuration
            ? JSON.parse(usageDuration)
            : product.usageDuration;
        product.category = category || product.category;
        product.seller = seller ? JSON.parse(seller) : product.seller;

        await product.save();
        res.status(200).json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            message: "Something went wrong while updating the product",
        });
    }
};

// Get all products with search, filter, and sorting
export const getProducts = async (req, res) => {
    const { search, category, sortBy, order } = req.query;

    try {
        const query = {};

        // Add search filter
        if (search) {
            query.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        // Add category filter
        if (category && category !== "All") {
            query.category = category;
        }

        // Sorting
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === "desc" ? -1 : 1;
        }

        const products = await Product.find(query).sort(sortOptions);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while fetching the products",
        });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while fetching the product details",
        });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.listedBy.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Not authorized to delete this product" });
        }

        await Product.deleteOne({ _id: id });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while deleting the product",
        });
    }
};

// Get products listed by the logged-in user
export const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({ listedBy: req.user._id });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching user products:", error);
        res.status(500).json({ message: "Failed to fetch your products" });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while fetching products by category",
        });
    }
};
