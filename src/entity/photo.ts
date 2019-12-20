import * as mongoose from "mongoose";
import * as  multer from 'multer';

export interface IPhoto extends mongoose.Document {
  path: string;
  caption: string;
}

export const PhotoSchema = new mongoose.Schema({
  path:  { type: String },
  caption: { type: String }
});

const Photo = mongoose.model<IPhoto>("Photo", PhotoSchema);
export default Photo;