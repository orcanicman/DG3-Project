import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

//JWT Verify
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]?.split(" ")[1];
  if (authHeader) {
    verify(authHeader, process.env.ACCESS_TOKEN!, (error, user) => {
      if (error) {
        return res.status(403).json("Token is not valid");
      }
      res.locals.jwt = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};
