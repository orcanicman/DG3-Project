import { IComment } from "./IComment";
import { IUser } from "./IUser";

export interface IPost {
  title: string;
  content: string;
  author: IUser;
  usersLiked: IUser[];
  _count: {
    usersLiked: number;
  };
  comments?: IComment[];
  id?: string;
  createdAt: string;
}
