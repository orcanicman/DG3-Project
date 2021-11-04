import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { isAuth } from "../middleware/isAuth";

const router = Router();

//get
router.get("/", UserController.getAll);
router.get("/:tag", UserController.getOne);
router.post("/register", UserController.create);
router.put("/:id", isAuth, UserController.update);
router.delete("/:id", isAuth, UserController.delete);

export { router };
