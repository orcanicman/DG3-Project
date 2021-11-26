import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { isAuth } from "../middleware/isAuth";

const router = Router();

//get
router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
router.post("/", isAuth, PostController.create);
router.put("/:id", isAuth, PostController.update);
router.post("/:id", isAuth, PostController.comment);
router.put(
  "/:postId/:commentId/toggleLike",
  isAuth,
  PostController.toggleCommentLike
);
router.put("/:id/toggleLike", isAuth, PostController.toggleLike);
router.delete("/:id", isAuth, PostController.delete);

export { router };
