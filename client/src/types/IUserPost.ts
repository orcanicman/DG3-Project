import { IComment } from "./IComment";
import { IPost } from "./IPost";
import { IUser } from "./IUser";

export interface IUserPost {
  title: string;
  content: string;
  author: IUser;
  likedPost: IPost[];
  _count: {
    likedPost: number;
  };
  comments?: IComment[];
  id?: string;
  createdAt: string;
}
