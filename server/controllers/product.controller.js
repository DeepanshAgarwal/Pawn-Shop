import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    const {
        name,
        price,
        description,
        condition,
        usageDuration,
        image,
        seller,
    } = req.body;

    try {
        // Create a new product
        const product = new Product({
            name,
            price,
            description,
            condition,
            usageDuration,
            image,
            seller,
            listedBy: req.user._id, // Link product to the logged-in user
        });

        // Save the product to the database
        await product.save();
        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while creating the product",
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // You can also add filters or sorting here
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while fetching the products",
        });
    }
};

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

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        price,
        description,
        condition,
        usageDuration,
        image,
        seller,
    } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the logged-in user is the one who created the product
        if (product.listedBy.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Not authorized to update this product" });
        }

        // Update product fields
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.condition = condition || product.condition;
        product.usageDuration = usageDuration || product.usageDuration;
        product.image = image || product.image;
        product.seller = seller || product.seller;

        // Save the updated product
        await product.save();
        res.status(200).json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while updating the product",
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the logged-in user is the one who created the product
        if (product.listedBy.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Not authorized to delete this product" });
        }

        // Delete the product
        await Product.deleteOne({ _id: id });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while deleting the product",
        });
    }
};

export const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({ listedBy: req.user._id });

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching user products:", error);
        res.status(500).json({ message: "Failed to fetch your products" });
    }
};
