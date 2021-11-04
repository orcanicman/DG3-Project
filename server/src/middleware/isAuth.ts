import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let authorization = request.headers["authorization"]?.split(" ")[1];

  if (authorization) {
    verify(authorization, process.env.ACCESS_TOKEN!, (error, decoded) => {
      if (error) {
        return response.status(401).json({
          message: error.message,
          error,
        });
      } else {
        response.locals.jwt = decoded;
        next();
      }
    });
  } else {
    return response.status(401).json({ message: "Unauthorized" });
  }
};
