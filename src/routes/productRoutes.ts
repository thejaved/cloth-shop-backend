import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  upload,
} from "../controllers/productController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/create", upload.single("image"), createProduct);

router.get("/", auth, getProducts);

router.get("/:id", auth, getProductById);

export default router;
