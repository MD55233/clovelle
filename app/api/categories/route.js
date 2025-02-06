import { connectDB } from "@/utils/db";
import Category from "@/models/category";
import { NextResponse } from "next/server";

// GET /api/categories (Fetch all categories)
export async function GET() {
    try {
        await connectDB();
        const categories = await Category.find();
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching categories", error: error.message }, { status: 500 });
    }
}

// POST /api/categories (Create a new category)
export async function POST(req) {
    try {
        await connectDB();
        const { name, description, parent, image, metaTitle, metaDescription, keywords } = await req.json();

        // ✅ Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return NextResponse.json({ message: "Category already exists" }, { status: 400 });
        }

        const newCategory = new Category({ name, description, parent, image, metaTitle, metaDescription, keywords });
        await newCategory.save();

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating category", error: error.message }, { status: 500 });
    }
}
