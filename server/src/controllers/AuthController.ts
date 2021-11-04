import argon2 from "argon2";
import { Request, Response } from "express";
import { ownPrisma } from "./PrismaClient";
import {
  removeRefreshToken,
  sendRefreshToken,
} from "../helpers/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../helpers/tokens";
import { verify } from "jsonwebtoken";
import { User } from ".prisma/client";

let refreshTokens: any[] = [];

// JWT REFRESH
class AuthController {
  static async refreshToken(request: Request, response: Response) {
    const refreshToken = request.cookies.jid;

    if (!refreshToken) return response.status(401).json("Not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return response.status(403).json("Not valid");
    }

    let payload: any = null;

    try {
      payload = verify(refreshToken, process.env.REFRESH_TOKEN!);
    } catch (error) {
      response.status(401).json("Not authenticated");
      console.log(error);
    }

    try {
      const user = await ownPrisma.user.findUnique({
        where: { id: payload.userId },
      });

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = createAccessToken(user!);
      const newRefreshToken = createRefreshToken(user!);

      refreshTokens.push(newRefreshToken);

      sendRefreshToken(response, newRefreshToken);
      response.status(200).json({
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.log(error);
      response.status(404).json("Could not find user");
    }
  }

  static async login(request: Request, response: Response) {
    const payload: { username: string; password: string } = request.body;

    try {
      const user = await ownPrisma.user.findUnique({
        where: { tag: payload.username },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const valid = await argon2.verify(user.password, payload.password);

      if (!valid) {
        throw new Error("Invalid credentials");
      }

      const { password, ...others } = user;

      //login successful
      const newRefreshToken = createRefreshToken(<User>others);
      refreshTokens.push(newRefreshToken);
      sendRefreshToken(response, newRefreshToken);

      console.log(`USER LOGGED IN: "${user.tag}"`);
      response
        .status(200)
        .json({ ...others, accessToken: createAccessToken(<User>others) });
    } catch (error) {
      console.log(`login Failed: ${error}`);
      response.status(500).json({ error: "could not login" });
    }
  }

  static async logout(request: Request, response: Response) {
    removeRefreshToken(response);
    response.status(200).json("Logout success");
  }
}

export { AuthController };
