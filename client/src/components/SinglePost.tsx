import React, { useCallback, useContext, useEffect, useState } from "react";
import { IPost } from "../types/IPost";
import defaultImg from "../Images/default.jpg";
import { Comment } from "./Comment";
import { Link } from "react-router-dom";
import { JWTAxios } from "../App";
import { UserContext } from "../context/UserContext";

interface SinglePostProps {
  post: IPost;
}

export const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [likes, setLikes] = useState(post._count.usersLiked);
  const [isLiked, setIsLiked] = useState(false);
  const [highlightedComment, setHighLightedComment] = useState("");

  const highLightedCommentPath = window.location.hash.split("#")[1];

  const { state } = useContext(UserContext);
  const user = state.user;

  const executeScroll = () => {
    ref?.scrollIntoView();
  };

  const onRefChange = useCallback(
    (node) => {
      setRef(node);
      executeScroll();
    },
    // eslint-disable-next-line
    [ref]
  );

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
    if (highLightedCommentPath) {
      post?.comments?.find((e) => e.id === highLightedCommentPath)?.id &&
        setHighLightedComment(
          post?.comments?.find((e) => e.id === highLightedCommentPath)?.id!
        );
      //this is actually fucking garbage
    }
  }, [user, post, highLightedCommentPath]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col pb-4 w-full border-b bg-white p-4">
        <div className="flex mb-2">
          <Link to={"/user/" + post.author.tag}>
            <img src={defaultImg} alt="" className="w-12 h-12 rounded-full" />
          </Link>
          <div className="ml-2">
            <Link to={"/user/" + post.author.tag}>
              <div className="text-sm font-light">@{post.author.tag}</div>
              <div className="font-bold">{post.author.name}</div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col ml-2 mb-2">
          <div className="mb-2 break-words font-bold">{post.title}</div>
          <div className="mb-2 break-words">{post.content}</div>
          <div className="flex">
            <button
              onClick={() => {
                toggleLike();
              }}
            >
              <div
                className={
                  // eslint-disable-next-line
                  isLiked ? "text-red" : "text-white" + "cursor-pointer"
                }
              >
                likes {likes}
              </div>
            </button>
            <div className="ml-2">
              <div>comments {post.comments?.length}</div>
            </div>
          </div>
        </div>
        {post.comments?.map((comment, i) => (
          <div
            className="border-b"
            key={"Comment" + comment.author.tag + String(i)}
            style={{
              backgroundColor:
                comment.id === highlightedComment ? "lightcoral" : "inherit",
            }}
            ref={comment.id === highlightedComment ? onRefChange : undefined}
          >
            <Comment comment={comment} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};
