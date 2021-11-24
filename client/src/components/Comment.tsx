import React, { useContext, useEffect, useState } from "react";
import { JWTAxios } from "../App";
import { UserContext } from "../context/UserContext";
import defaultImg from "../Images/default.jpg";
import { IComment } from "../types/IComment";
import { IPost } from "../types/IPost";

interface CommentProps {
  comment: IComment;
  post: IPost;
}

export const Comment: React.FC<CommentProps> = ({ comment, post }) => {
  const [likes, setLikes] = useState(comment.usersLiked.length);
  const [isLiked, setIsLiked] = useState(false);

  const { state } = useContext(UserContext);
  const user = state.user;

  const toggleLike = async () => {
    try {
      const res = await JWTAxios.put(
        `/post/${post.id}/${comment.id}/toggleLike`
      );
      if (res.status === 200) {
        res.data.message === "you liked this comment"
          ? setIsLiked(true)
          : setIsLiked(false);
        setLikes(res.data.comment.usersLiked.length);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (comment.usersLiked.find((e) => e.id === user?.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [user, comment]);

  return (
    <div>
      <div className="flex flex-col mt-4 mb-4">
        <div className="flex mb-2">
          <img src={defaultImg} alt="" className="w-12 h-12 rounded-full" />
          <div className="ml-2">
            <div className="text-sm font-light">@{comment.author.tag}</div>
            <div className="">{comment.author.name}</div>
          </div>
        </div>
        <div className="flex flex-col ml-2">
          <div className="ml-14 mt-2"></div>
          <div className="mb-2">{comment.content}</div>
          <div className="flex">
            <button onClick={() => toggleLike()}>
              <div
                className={
                  // eslint-disable-next-line
                  isLiked ? "text-red" : "text-white" + "cursor-pointer"
                }
              >
                likes {likes}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
