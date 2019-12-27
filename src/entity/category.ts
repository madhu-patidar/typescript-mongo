import * as mongoose from "mongoose";

export interface ICATEGORY extends mongoose.Document {
  name: string;
  modal: number;
  mfd:Date
}

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  modal: { type: String, required: true },
  mfd : { type: Date, required: true }
});

const Category = mongoose.model<ICATEGORY>("Category", CategorySchema);
export default Category;