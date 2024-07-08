import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  upload,
} from "../controllers/productController";

const router = express.Router();

router.post("/create", upload.single("image"), createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

export default router;
