import { Router } from "express";
import { router as user } from "./user";
import { router as auth } from "./auth";
import { router as post } from "./post";

const router = Router();

router.use("/user", user);
router.use("/auth", auth);
router.use("/post", post);

router.get("/", (request, response) => {
  response.send("api");
});

export { router };
