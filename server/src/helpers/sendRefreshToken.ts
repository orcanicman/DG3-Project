import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
  });
};

export const removeRefreshToken = (res: Response) => {
  res.cookie("jid", "", {
    httpOnly: true,
    maxAge: 1,
  });
};
