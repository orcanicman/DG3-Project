import mongoose from "mongoose";
import { MongoResult } from "../types/MongoResult";

export interface ICommunity extends MongoResult {
  name: string;
}

const CommunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Community", CommunitySchema);
