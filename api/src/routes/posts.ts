import { Router, Request, Response } from "express";
import { isAuth } from "../middleware/isAuth";
import Post from "../models/Post";
import User from "../models/User";

const router = Router();

//Create new post
router.post("/", isAuth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwt.userId);
    const newPost = new Post({
      username: user?.username,
      userId: user?.id,
      ...req.body,
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Update post
router.put("/:id", isAuth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwt.userId);
    const post = await Post.findById(req.params.id);
    if (post!.userId === user?.id) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can only update your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Post
router.delete("/:id", isAuth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwt.userId);
    const post = await Post.findById(req.params.id);
    if (post!.userId === user?.id) {
      try {
        await post!.delete();
        res.status(200).json("Post has been deleted...");
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can delete update your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Post
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post!);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all Posts
router.get("/", async (req: Request, res: Response) => {
  const username = <string>req.query.user;
  const catName = <any>req.query.cat; //TODO: not make type any
  try {
    let posts;
    if (username) {
      posts = await Post.find(
        { username },
        {},
        { limit: 50, sort: { createdAt: -1 } }
      );
    } else if (catName) {
      posts = await Post.find(
        {
          categories: {
            $in: [catName],
          },
        },
        {},
        { limit: 50, sort: { createdAt: -1 } }
      );
    } else {
      posts = await Post.find({}, {}, { limit: 50, sort: { createdAt: -1 } });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
