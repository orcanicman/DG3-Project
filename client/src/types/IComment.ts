export interface IComment {
    userName: string;
    userTag: string;
    content: string;
    likes: number;
    comments?: IComment[];
}