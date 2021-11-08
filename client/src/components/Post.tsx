import React, { useEffect, useState } from "react";
import { IPost } from "../types/IPost";
import defaultImg from "../Images/default.jpg";
import { Comment } from "./Comment";
import { Link } from "react-router-dom";

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [likes, setLikes] = useState(post._count.usersLiked);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // Send post to server
  };

  useEffect(() => {
    setLikes(post._count.usersLiked + (isLiked ? 1 : 0));
  }, [isLiked, post._count.usersLiked]);

  return (
    <div className="flex flex-col pb-4 w-full border-b bg-white hover:bg-lightGray p-4">
      <div className="flex mb-2">
        <img src={defaultImg} alt="" className="w-12 h-12 rounded-full" />
        <div className="ml-2">
          <div className="text-sm font-light">@{post.author.tag}</div>
          <div className="">{post.author.name}</div>
        </div>
      </div>
      <div className="flex flex-col ml-2 mb-2">
        <Link to={"/post/" + post.id}>
          <div className="mb-2 break-words">{post.title}</div>
          <div className="mb-2 break-words">{post.content}</div>
        </Link>
        <div className="flex">
          <button
            onClick={() => {
              toggleLike();
            }}
          >
            <div className="  cursor-pointer">likes {likes}</div>
          </button>
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
          <div
            className="pl-14 border-b bg-gray hover:bg-lightGray"
            key={"Comment" + comment.author.tag + String(i)}
          >
            <Comment comment={comment} />
          </div>
        ))}
    </div>
  );
};
