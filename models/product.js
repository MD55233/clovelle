import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
      // Basic Details
      name: { type: String, required: true, trim: true },
      description: { type: String, required: true },
      slug: {
        type: String,
        unique: true,
        required: true,
      }, // SEO-friendly URL slug
      categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }], // Multiple categories
      subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }, // Optional subcategory
      brand: { type: String, required: true },
      sku: { type: String, unique: true }, // Stock Keeping Unit
      price: { type: Number, required: true },
      discount: { type: Number, default: 0 }, // Percentage discount
      stock: { type: Number, required: true, min: 0 },
      tags: [{ type: String }], // Tags for filtering
  
      // SEO Fields
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }], // SEO Keywords
  
      // Images & Variations
      images: [
        {
          url: { type: String, required: true },
          alt: { type: String, default: "" }, // Alternative text for accessibility
        },
      ],
      variations: [
        {
          color: { type: String },
          size: { type: String },
          price: { type: Number },
          stock: { type: Number },
          image: { type: String }, // Image for specific variation
        },
      ],
  
      // Reviews & Ratings
      ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
      reviews: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          rating: { type: Number, required: true, min: 1, max: 5 },
          comment: { type: String },
          createdAt: { type: Date, default: Date.now },
        },
      ],
  
      // Shipping & Returns
      weight: { type: Number }, // in kg
      dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
      },
      returnPolicy: { type: String, default: "No returns accepted" },
  
      // Status & Management
      isFeatured: { type: Boolean, default: false }, // Show on homepage
      isActive: { type: Boolean, default: true }, // Soft delete functionality
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin or Seller
    },
    { timestamps: true }, // Automatically adds createdAt & updatedAt
  )
  

// ✅ Ensure `slug` is generated only when `name` is modified
productSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
    next();
});

// ✅ Ensure `slug` uniqueness in MongoDB // ❌ Remove this duplicate index definition
// productSchema.index({ slug: 1 }, { unique: true });
//productSchema.index({ slug: 1 }, { unique: true });

// ✅ Virtual field to auto-calculate `aver

export default mongoose.models.Product || mongoose.model("Product", productSchema);

