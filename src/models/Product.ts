import { Document, Schema, model } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  ratingCount: number;
  inStockCount: number;
  imageUrl?: string;
}

const productSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ratingCount: { type: Number, default: 0 },
  inStockCount: { type: Number, default: 0 },
  imageUrl: { type: String },
});

const Product = model<ProductDocument>("Product", productSchema);

export default Product;
