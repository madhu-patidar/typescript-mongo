import * as mongoose from "mongoose";

export interface IBook extends mongoose.Document {
  title: string;
  author: number;
  publish:Date
}

export const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publish : { type: Date, required: true }
});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;