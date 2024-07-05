import express from "express";
import { createProduct, upload } from "../controllers/productController";

const router = express.Router();

router.post("/create", upload.single("image"), createProduct);

export default router;
