import * as mongoose from "mongoose";

export interface IPRODUCT extends mongoose.Document {
  name: string;
  modal: number;
  mfd:Date;
  image: String
}

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  modal: { type: String, required: true },
  mfd : { type: Date, required: true },
  image : { type: String, required: true },
});

const Product = mongoose.model<IPRODUCT>("Product", ProductSchema);
export default Product;