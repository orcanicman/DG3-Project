import React, { useContext, useRef, useState } from "react";
import { JWTAxios } from "../App";
import { UserContext } from "../context/UserContext";
import defaultImg from "../Images/default.jpg";

interface WriteCommentProps {
  postId: string;
}

export const WriteComment: React.FC<WriteCommentProps> = ({ postId }) => {
  const { state } = useContext(UserContext);
  const user = state.user;
  const [content, setContent] = useState("");

  const ownInput = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "inherit";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const handleComment = async () => {
    try {
      const res = await JWTAxios.post(`/post/${postId}`, {
        id: user?.id,
        content,
      });
      window.location.replace(`/post/${postId}#${res.data.id}`);
    } catch (error) {}
  };

  return (
    <div className="flex border-b">
      <img src={defaultImg} alt="" className="rounded-full p-3 w-20 h-20" />
      <div className="flex-grow relative select-text whitespace-pre-wrap break-words overflow-auto">
        <textarea
          ref={ownInput}
          className="w-full border-b outline-none p-4 break-words resize-none overflow-hidden"
          style={{ backgroundColor: "inherit" }}
          placeholder="Write something..."
          value={content}
          rows={1}
          onChange={(e) => {
            setContent(e.target.value);
            handleKeyDown(e);
          }}
        />
        <div className="flex justify-between p-2">
          <div className={content.length <= 256 ? "text-black" : "text-red"}>
            {content.length}/256
          </div>
          <button
            disabled={content.length > 256}
            className="border px-1 rounded hover:bg-black hover:text-white"
            style={{
              cursor: content.length > 256 ? "not-allowed" : "pointer",
            }}
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};
