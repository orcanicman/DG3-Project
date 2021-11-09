import { Post } from ".prisma/client";
import { Request, Response } from "express";
import { ownPrisma } from "./PrismaClient";

class PostController {
  static async getOne(request: Request, response: Response) {
    try {
      const post = await ownPrisma.post.findUnique({
        where: { id: request.params.id },
        select: {
          id: true,
          title: true,
          content: true,
          comments: true,
          author: { select: { id: true, name: true, tag: true } },
          _count: { select: { usersLiked: true } },
        },
      });
      !post && response.status(404).json({ message: "Could not find post" });
      response.status(200).json(post);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "error" });
    }
  }

  static async getAll(request: Request, response: Response) {
    try {
      const posts = await ownPrisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          comments: true,
          author: { select: { id: true, name: true, tag: true } },
          _count: { select: { usersLiked: true } },
        },
      });
      !posts && response.status(404).json({ message: "No posts found" });
      response.status(200).json(posts);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "error" });
    }
  }

  static async create(request: Request, response: Response) {
    const token = response.locals.jwt;
    const payload: Post = request.body;
    !token && response.status(401).json({ message: "not authenticated" });

    if (token.userId === request.body.id) {
      try {
        const post = await ownPrisma.post.create({
          data: {
            title: payload.title,
            content: payload.content,
            authorId: token.userId,
          },
        });
        response.status(200).json(post);
      } catch (error) {
        console.log(error);
        response.status(500).json({ message: "error" });
      }
    } else {
      response.status(401).json({ message: "not authenticated" });
    }
  }

  static async delete(request: Request, response: Response) {
    try {
      const userId = response.locals.jwt.userId;
      const post = await ownPrisma.post.findUnique({
        where: { id: request.params.id },
      });
      if (post?.authorId === userId) {
        const deletedPost = await ownPrisma.post.delete({
          where: { id: request.params.id },
        });
        !deletedPost &&
          response.status(404).json({ message: "Post not found" });
        response.status(200).json({ message: "Post deleted" });
      } else {
        response.status(401).json({ message: "not authenticated" });
      }
    } catch (error) {
      response.status(500).json({ error: "error" });
    }
  }

  static async update(request: Request, response: Response) {
    try {
      const payload: Post = request.body;
      const userId = response.locals.jwt.userId;
      const post = await ownPrisma.post.findUnique({
        where: { id: request.params.id },
      });
      if (post?.authorId === userId) {
        const updatedPost = await ownPrisma.post.update({
          where: { id: request.params.id },
          data: { title: payload.title, content: payload.content },
        });
        !updatedPost &&
          response.status(404).json({ message: "Post not found" });
        response.status(200).json(updatedPost);
      } else {
        response.status(401).json({ message: "not authenticated" });
      }
    } catch (error) {
      response.status(500).json({ error: "error" });
    }
  }
}

export { PostController };
