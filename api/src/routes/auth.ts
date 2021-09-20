import { Router, Request, Response } from "express";
import argon2 from "argon2";
import User, { IUser } from "../models/User";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../helpers/createTokens";
import {
  removeRefreshToken,
  sendRefreshToken,
} from "../helpers/sendRefreshToken";

const router = Router();

let refreshTokens: any[] = [];

//JWT Refresh
router.post("/refresh", async (req: Request, res: Response) => {
  const refreshToken = req.cookies.jid;

  if (!refreshToken) return res.status(401).json("Not authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Not valid");
  }

  let payload: any = null;

  try {
    payload = verify(refreshToken, process.env.REFRESH_TOKEN!);
  } catch (error) {
    res.status(401).json("Not authenticated");
    console.log(error);
  }

  try {
    const user = await User.findById(payload.userId);

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = createAccessToken(user!);
    const newRefreshToken = createRefreshToken(user!);

    refreshTokens.push(newRefreshToken);

    sendRefreshToken(res, newRefreshToken);
    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Could not find user");
  }
});

//Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, {
      type: argon2.argon2id,
    });
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select(
      "+password"
    );
    !user && res.status(400).json("Wrong credentials!");

    const valid = await argon2.verify(user!.password, req.body.password);
    !valid && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user!._doc;

    const newRefreshToken = createRefreshToken(<IUser>others);
    refreshTokens.push(newRefreshToken);
    sendRefreshToken(res, newRefreshToken);
    res
      .status(200)
      .json({ ...others, accessToken: createAccessToken(<IUser>others) });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/logout", (req: Request, res: Response) => {
  removeRefreshToken(res);
  res.status(200).json("Logout success");
});

export default router;
