import { connectDB } from "@/utils/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// GET /api/products (Fetch all products)
export async function GET() {
    try {
        await connectDB();
        const products = await Product.find().populate("category"); // Fetch products with category details
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
    }
}

// POST /api/products (Create a new product)
export async function POST(req) {
    try {
        await connectDB();
        const { name, description, price, categoryId } = await req.json();

        const product = new Product({
            name,
            description,
            price,
            category: categoryId, // Linking product to category
        });

        await product.save();
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating product" }, { status: 500 });
    }
}