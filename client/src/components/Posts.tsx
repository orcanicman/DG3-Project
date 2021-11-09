import React, { useEffect, useState } from "react";
import { apiAxios } from "../App";
import { IPost } from "../types/IPost";
import { Post } from "./Post";

interface PostsProps {}

export const Posts: React.FC<PostsProps> = () => {
  const [posts, setPosts] = useState<IPost[]>();

  const getPosts = async () => {
    try {
      const res = await apiAxios.get("/post");
      setPosts(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {posts?.map((e, i) => (
        <Post key={i} post={e} />
      ))}
    </div>
  );
};
