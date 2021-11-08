import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { apiAxios } from "../App";
import { CommunitySideBar } from "../components/CommunitySideBar";
import { SinglePost } from "../components/SinglePost";
import { UserSideBar } from "../components/UserSideBar";
import { IPost } from "../types/IPost";

interface SingleProps {}

export const Single: React.FC<SingleProps> = () => {
  const [post, setPost] = useState<IPost>();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const getPost = async () => {
    try {
      const res = await apiAxios.get(`/post/${path}`);
      setPost(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex">
      <div className="hidden sm:flex flex-shrink bg-lightGray sm:w-64">
        <UserSideBar />
      </div>
      <div className="flex flex-grow bg-white sm:w-80 min-h-screen">
        {post && <SinglePost post={post} />}
      </div>
      <div className="hidden sm:flex flex-shrink bg-lightGray sm:w-64">
        <CommunitySideBar />
      </div>
    </div>
  );
};
