import { Request, Response } from "express";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  try {
    // Create new product instance
    const product = new Product({ name, description, price });

    // Save product to database
    await product.save();

    // Respond with success message
    res.status(201).json({ msg: "Product created successfully", product });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
