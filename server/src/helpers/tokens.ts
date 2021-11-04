import { User } from ".prisma/client";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id, tag: user.tag }, process.env.ACCESS_TOKEN!, {
    expiresIn: "1m",
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id, tag: user.tag }, process.env.REFRESH_TOKEN!, {
    expiresIn: "7d",
  });
};
