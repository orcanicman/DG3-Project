import React, { useState } from "react";
import { IPost } from "../types/IPost";
import defaultImg from "../Images/default.jpg";
import { Comment } from "./Comment";
import { Link } from "react-router-dom";

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Link to="/post/testin">
      <div className="flex flex-col mt-4 mb-4 w-full bg-gray p-4 rounded">
        <div className="flex mb-2">
          <img src={defaultImg} alt="" className="w-12 h-12 rounded-full" />
          <div className="ml-2">
            <div className="text-sm font-light">@{post.userTag}</div>
            <div className="">{post.userName}</div>
          </div>
        </div>
        <div className="flex flex-col ml-2 mb-2">
          <div className="ml-14"></div>
          <div className="mb-2">{post.title}</div>
          <div className="mb-2">{post.content}</div>
          <div className="flex">
            <div>likes {post.likes}</div>
            <div className="ml-2">
              <button
                onClick={() => {
                  setIsCollapsed(!isCollapsed);
                }}
              >
                comments {post.comments?.length}
              </button>
            </div>
          </div>
        </div>
        {isCollapsed &&
          post.comments?.map((comment, i) => (
            <div className="pl-14">
              <Comment key={i} comment={comment} />
            </div>
          ))}
      </div>
    </Link>
  );
};
