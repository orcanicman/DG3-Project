import { User } from ".prisma/client";
import { hash } from "argon2";
import { Request, Response } from "express";
import { ownPrisma } from "./PrismaClient";

class UserController {
  static async create(request: Request, response: Response) {
    const payload: User = request.body;

    const password = await hash(payload.password);
    try {
      const newUser = await ownPrisma.user.create({
        data: { ...payload, password },
      });
      response.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "error" });
    }
  }

  static async getOne(request: Request, response: Response) {
    try {
      const user = await ownPrisma.user.findUnique({
        where: { tag: request.params.tag },
        select: {
          name: true,
          tag: true,
          profile: true,
          posts: true,
          comments: true,
        },
      });
      response.status(200).json(user);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "error" });
    }
  }

  static async getAll(request: Request, response: Response) {
    try {
      const allUsers = await ownPrisma.user.findMany({
        select: { id: true, name: true, tag: true },
      });
      response.status(200).json(allUsers);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "error" });
    }
  }

  static async delete(request: Request, response: Response) {
    const token = response.locals.jwt;
    !token && response.status(401).json({ message: "not authorized" });
    if (token.userId === request.params.id) {
      try {
        const deletedUser = await ownPrisma.user.delete({
          where: { tag: token.userId },
        });

        response.status(200).json(deletedUser);
      } catch (error) {
        console.log(error);
        response.status(500).json({ message: "error" });
      }
      response.status(404).json({ message: "not found" });
    } else {
      response.status(401).json({ message: "not authorized" });
    }
  }

  static async update(request: Request, response: Response) {
    if (request.body.password) {
      request.body.password = await hash(request.body.password);
    }
    const token = response.locals.jwt;
    !token && response.status(401).json({ message: "not authorized" });
    if (token.userId === request.params.id) {
      try {
        const payload: User = request.body;
        const updatedUser = await ownPrisma.user.update({
          where: { id: token.userId },
          data: payload,
        });

        response.status(200).json(updatedUser);
      } catch (error) {
        console.log(error);
        response.status(500).json({ message: "error" });
      }
    } else {
      response.status(401).json({ message: "not authorized" });
    }
  }
}

export { UserController };
