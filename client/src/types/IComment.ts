import { IUser } from "./IUser";

export interface IComment {
  content: string;
  author: IUser;
  likes: number;
  comments?: IComment[];
  createdAt: string;
}
