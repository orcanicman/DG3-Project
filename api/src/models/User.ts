import { Schema, model } from "mongoose";
import { MongoResult } from "../types/MongoResult";

export interface IUser extends MongoResult {
  username: string;
  email: string;
  password: string;
  profilePic: string;
  isAdmin: boolean;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
