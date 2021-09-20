import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth";
import userRoute from "./routes/users";
import postRoute from "./routes/posts";
import communityRoute from "./routes/communities";
import { isAuth } from "./middleware/isAuth";

const connectToDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

const PORT = 5000;
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

connectToDB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", isAuth, upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", communityRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
