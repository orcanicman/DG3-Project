import { IComment } from "./IComment";

export interface IPost {
    userName: string;
    userTag: string;
    title: string;
    content: string;
    likes: number;
    comments?: IComment[]
}