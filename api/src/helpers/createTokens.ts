import { sign } from "jsonwebtoken";
import { IUser } from "../models/User";

export const createAccessToken = (user: IUser) => {
  return sign({ userId: user._id! }, process.env.ACCESS_TOKEN!, {
    expiresIn: "15s",
  });
};

export const createRefreshToken = (user: IUser) => {
  return sign({ userId: user._id! }, process.env.REFRESH_TOKEN!, {
    expiresIn: "7d",
  });
};
