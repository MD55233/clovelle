import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        // Basic Details
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        slug: { type: String, required: true, unique: true, index: true }, // Unique SEO-friendly URL slug
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        brand: { type: String, required: true },
        sku: { type: String, unique: true }, // Stock Keeping Unit
        price: { type: Number, required: true, min: 0 },
        discount: { type: Number, default: 0, min: 0, max: 100 }, // Percentage discount (0-100)
        stock: { type: Number, required: true, min: 0 },
        tags: [{ type: String, default: [] }], // Tags for filtering

        // SEO Fields
        metaTitle: { type: String },
        metaDescription: { type: String },
        keywords: [{ type: String, default: [] }], // SEO Keywords

        // Images & Variations
        images: [
            {
                url: { type: String, required: true },
                alt: { type: String, default: "" }, // Alternative text for accessibility
            }
        ],
        variations: [
            {
                color: { type: String },
                size: { type: String },
                price: { type: Number, default: 0 },
                stock: { type: Number, default: 0, min: 0 },
                image: { type: String }, // Image for specific variation
            }
        ],

        // Reviews & Ratings
        ratings: {
            average: { type: Number, default: 0, min: 0, max: 5 },
            count: { type: Number, default: 0, min: 0 },
        },
        reviews: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, required: true, min: 1, max: 5 },
                comment: { type: String },
                createdAt: { type: Date, default: Date.now },
            }
        ],

        // Shipping & Returns
        weight: { type: Number, min: 0 }, // in kg
        dimensions: {
            length: { type: Number, min: 0 },
            width: { type: Number, min: 0 },
            height: { type: Number, min: 0 },
        },
        returnPolicy: { type: String, default: "No returns accepted" },

        // Status & Management
        isFeatured: { type: Boolean, default: false }, // Show on homepage
        isActive: { type: Boolean, default: true }, // Soft delete functionality
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin or Seller
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

// ✅ Ensure `slug` is generated only when `name` is modified
productSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
    next();
});

// ✅ Ensure `slug` uniqueness in MongoDB
productSchema.index({ slug: 1 }, { unique: true });

// ✅ Virtual field to auto-calculate `aver
