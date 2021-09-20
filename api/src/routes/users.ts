import { Router, Request, Response } from "express";
import { isAuth } from "../middleware/isAuth";
import argon2 from "argon2";
import User from "../models/User";
import Post from "../models/Post";

const router = Router();

//Update
router.put("/:id", isAuth, async (req: Request, res: Response) => {
  if (res.locals.jwt.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password, {
        type: argon2.argon2id,
      });
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update only your accout");
  }
});

//Delete
router.delete("/:id", isAuth, async (req: Request, res: Response) => {
  if (res.locals.jwt.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user!.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your accout");
  }
});

//Get User
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    !user && res.status(404).json("User not found");
    res.status(200).json(user!);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
