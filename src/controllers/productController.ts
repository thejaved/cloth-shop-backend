import path from "path";
import multer from "multer";
import { Request, Response } from "express";
import Product, { ProductDocument } from "../models/Product";
import { uploadImageToFirebase } from "../services/firebase";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, ratingCount, inStockCount } = req.body;

  try {
    let imageUrl: string | undefined;
    if (req.file && req.file.buffer) {
      const buffer = req.file.buffer;
      const filename = `${Date.now()}_${path.basename(req.file.originalname)}`;
      imageUrl = await uploadImageToFirebase(buffer, filename);
    }

    const productData: Partial<ProductDocument> = {
      name,
      description,
      price,
      ratingCount,
      inStockCount,
      imageUrl,
    };

    const product = new Product(productData);
    await product.save();
    res.status(201).json({ msg: "Product created successfully", product });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
