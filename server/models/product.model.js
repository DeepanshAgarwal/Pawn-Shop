import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
            enum: ["New", "Almost New", "Used"],
        },
        usageDuration: {
            value: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
                required: true,
                enum: ["days", "months", "years"],
            },
        },
        image: {
            type: String, // Single image URL or base64 string
            required: true,
        },
        seller: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            hostel: { type: String, required: true },
            room: { type: String, required: true },
        },
        listedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
