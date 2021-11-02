import React from "react";
import { IPost } from "../types/IPost";
import { Post } from "./Post";
import { SinglePost } from "./SinglePost";

interface PostsProps {}

const testPosts: IPost[] = [
  {
    title: "TestingTitle",
    userName: "Bjorn",
    userTag: "orcanicman",
    content: "dit is een test post hahaha hihihi",
    likes: 1,
    comments: [
      {
        userName: "conre",
        userTag: "coyuu",
        content: "xDDDDD",
        likes: 2,
        comments: [
          {
            userName: "corne",
            userTag: "coyuu",
            content: "xDDDDD",
            likes: 2,
            comments: [
              {
                userName: "corne",
                userTag: "coyuu",
                content: "xDDDDD",
                likes: 2,
                comments: [],
              },
            ],
          },
        ],
      },
      {
        userName: "conre",
        userTag: "coyuu",
        content: "Whats this xDDD",
        likes: 2,
        comments: [],
      },
    ],
  },
  {
    title: "2131321",
    userName: "Bjorn",
    userTag: "orcanicman",
    content:
      "dit is een test post hahaha hihihi jow jow dnaida dnwaod dioaw dnawip dnwaio dwano",
    likes: 1,
    comments: [],
  },
];

export const Posts: React.FC<PostsProps> = () => {
  return (
    <div className="flex flex-col">
      {testPosts.map((e, i) => (
        <Post key={i} post={e} />
      ))}
    </div>
  );
};
