import { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
    {
        // Basic Details
        name: { type: String, required: true, unique: true, trim: true },
        slug: { type: String, unique: true, index: true }, // Unique, SEO-friendly slug
        description: { type: String },
        image: { type: String }, // Category banner/image

        // Parent-Child Relationship
        parent: { type: Schema.Types.ObjectId, ref: "Category", default: null }, // Parent category (for subcategories)
        children: [{ type: Schema.Types.ObjectId, ref: "Category", default: [] }], // Store subcategory IDs

        // SEO Fields
        metaTitle: { type: String },
        metaDescription: { type: String },
        keywords: [{ type: String }], // SEO Keywords

        // Status
        isActive: { type: Boolean, default: true }, // Soft delete functionality
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

// ✅ Ensure slug is generated only when name is modified
categorySchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
    next();
});

// ✅ Ensure uniqueness of slug using an index
categorySchema.index({ slug: 1 }, { unique: true });

export default models.Category || model("Category", categorySchema);
