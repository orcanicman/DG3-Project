import React, { useContext, useEffect, useState } from "react";
import { IPost } from "../types/IPost";
import defaultImg from "../Images/default.jpg";
import { Comment } from "./Comment";
import { Link } from "react-router-dom";
import { JWTAxios } from "../App";
import { UserContext } from "../context/UserContext";

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [likes, setLikes] = useState(post._count.usersLiked);
  const [isLiked, setIsLiked] = useState(false);

  const { state } = useContext(UserContext);
  const user = state.user;

  const toggleLike = async () => {
    try {
      const res = await JWTAxios.put(`/post/${post.id}/toggleLike`);
      if (res.status === 200) {
        res.data.message === "you liked this post"
          ? setIsLiked(true)
          : setIsLiked(false);
        setLikes(res.data.updatedPost._count.usersLiked);
      }
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    if (post.usersLiked.find((e) => e.id === user?.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [user, post]);

  return (
    <div className="flex flex-col pb-4 w-full border-b bg-white hover:bg-lightGray p-4">
      <div className="flex mb-2">
        <Link to={"/user/" + post.author.tag}>
          <img src={defaultImg} alt="" className="w-12 h-12 rounded-full" />
        </Link>
        <div className="ml-2">
          <Link to={"/user/" + post.author.tag}>
            <div className="text-sm font-light">@{post.author.tag}</div>
            <div className="">{post.author.name}</div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col ml-2 mb-2">
        <Link to={"/post/" + post.id}>
          <div className="mb-2 break-words font-bold">{post.title}</div>
          <div className="mb-2 break-words">{post.content}</div>
        </Link>
        <div className="flex">
          <button
            onClick={() => {
              toggleLike();
            }}
          >
            <div
              className={isLiked ? "text-red" : "text-white" + "cursor-pointer"}
            >
              likes {likes}
            </div>
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
