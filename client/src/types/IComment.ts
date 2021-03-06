import { IPost } from "./IPost";
import { IUser } from "./IUser";

export interface IComment {
  id: string;
  content: string;
  author: IUser;
  usersLiked: IUser[];
  _count: {
    usersLiked: number;
  };
  post?: IPost;
  comments?: IComment[];
  createdAt: string;
}
