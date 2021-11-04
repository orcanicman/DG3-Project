import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/refresh", AuthController.refreshToken);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export { router };
