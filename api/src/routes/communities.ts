import { Router, Request, Response } from "express";
import { isAuth } from "../middleware/isAuth";
import Community from "../models/Community";

const router = Router();

router.post("/", isAuth, async (req: Request, res: Response) => {
  const newCommunity = new Community(req.body);
  try {
    const savedCommunity = await newCommunity.save();
    res.status(200).json(savedCommunity);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const coms = await Community.find();
    res.status(200).json(coms);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
