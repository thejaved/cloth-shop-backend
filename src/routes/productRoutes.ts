import express from "express";
import { createProduct } from "../controllers/productController";
import { auth } from "../middleware/auth";

const router = express.Router();

// POST /api/products/create
router.post("/create", auth, createProduct);

export default router;
