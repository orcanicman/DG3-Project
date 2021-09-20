import mongoose from "mongoose";
import { MongoResult } from "../types/MongoResult";

export interface IPost extends MongoResult {
  title: string;
  desc: string;
  photo: string;
  username: string;
  userId: string;
  categories: [];
}

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
