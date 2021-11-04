import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes";

const PORT = 5000;
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use(router);

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
