import { Comment, Post } from ".prisma/client";
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
          comments: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              usersLiked: true,
              author: { select: { id: true, name: true, tag: true } },
            },
          },
          createdAt: true,
          author: { select: { id: true, name: true, tag: true } },
          usersLiked: { select: { id: true, name: true, tag: true } },
          _count: { select: { usersLiked: true } },
        },
      });
      !post
        ? response.status(404).json({ message: "Could not find post" })
        : response.status(200).json(post);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "error" });
    }
  }

  static async getAll(request: Request, response: Response) {
    try {
      const posts = await ownPrisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          content: true,
          comments: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              usersLiked: true,
              author: { select: { id: true, name: true, tag: true } },
            },
          },
          createdAt: true,
          author: { select: { id: true, name: true, tag: true } },
          usersLiked: { select: { id: true, name: true, tag: true } },
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

  static async comment(request: Request, response: Response) {
    try {
      const userId = response.locals.jwt.userId;
      const payload: Comment = request.body;
      const comment = await ownPrisma.comment.create({
        data: {
          content: payload.content,
          authorId: userId,
          postId: request.params.id,
        },
      });
      response.status(200).json(comment);
    } catch (error) {
      response.status(401).json({ message: "not authenticated" });
    }
  }

  // this is going to be ugly
  static async toggleLike(request: Request, response: Response) {
    try {
      const userId = response.locals.jwt.userId;
      const post = await ownPrisma.post.findUnique({
        where: { id: request.params.id },
        select: { usersLiked: true },
      });
      if (post?.usersLiked.find((e) => e.id === userId)) {
        const updatedPost = await ownPrisma.post.update({
          where: { id: request.params.id },
          select: {
            id: true,
            title: true,
            content: true,
            comments: true,
            author: { select: { id: true, name: true, tag: true } },
            usersLiked: { select: { id: true, name: true, tag: true } },
            _count: { select: { usersLiked: true } },
          },
          data: { usersLiked: { disconnect: { id: userId } } },
        });
        response
          .status(200)
          .json({ message: "you unliked this post", updatedPost });
      } else {
        const updatedPost = await ownPrisma.post.update({
          where: { id: request.params.id },
          select: {
            id: true,
            title: true,
            content: true,
            comments: true,
            author: { select: { id: true, name: true, tag: true } },
            _count: { select: { usersLiked: true } },
          },
          data: { usersLiked: { connect: { id: userId } } },
        });
        response
          .status(200)
          .json({ message: "you liked this post", updatedPost });
      }
    } catch (error) {
      response.status(500).json({ message: "could not unlike post" });
    }
  }

  // this as well lol, dc anymore
  static async toggleCommentLike(request: Request, response: Response) {
    try {
      const userId = response.locals.jwt.userId;
      const findComment = await ownPrisma.comment.findUnique({
        where: { id: request.params.commentId },
        select: { usersLiked: true },
      });
      if (findComment?.usersLiked.find((e) => e.id === userId)) {
        const comment = await ownPrisma.comment.update({
          where: { id: request.params.commentId },
          include: { usersLiked: true },
          data: { usersLiked: { disconnect: { id: userId } } },
        });

        response
          .status(200)
          .json({ message: "you unliked this comment", comment });
      } else {
        const comment = await ownPrisma.comment.update({
          where: { id: request.params.commentId },
          include: { usersLiked: true },
          data: { usersLiked: { connect: { id: userId } } },
        });
        response
          .status(200)
          .json({ message: "you liked this comment", comment });
      }
    } catch (error) {
      response.status(500).json({ message: "could not reach the server" });
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
