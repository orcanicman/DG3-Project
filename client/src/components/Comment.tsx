import React, { useState } from "react";

import defaultImg from "../Images/default.jpg";
import { IComment } from "../types/IComment";

interface CommentProps {
  comment: IComment;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex flex-col mt-4 mb-4">
      <div className="flex mb-2">
        <img src={defaultImg} alt="" className="w-12 h-12 rounded-full" />
        <div className="ml-2">
          <div className="text-sm font-light">@{comment.userTag}</div>
          <div className="">{comment.userName}</div>
        </div>
      </div>
      <div className="flex flex-col ml-2 mb-4">
        <div className="ml-14 mt-2"></div>
        <div className="mb-2">{comment.content}</div>
        <div className="flex">
          <div>likes {comment.likes}</div>
          <div className="ml-2">
            <button
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}
            >
              comments {comment.comments?.length}
            </button>
          </div>
        </div>
      </div>
      {isCollapsed && (
        <div className="ml-12 border-b">
          {comment.comments?.map((comment, i) => (
            <Comment key={i} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
