import React from "react";
import { Post } from "../components/Post";
import defaultImg from "../Images/default.jpg";
import { Comment } from "./Comment";
import { UserSideBar } from "../components/UserSideBar";
import { CommunitySideBar } from "../components/CommunitySideBar";
import { Posts } from "./Posts";
import { Profile } from "./Profile";

interface UserpageProps {}

export const Userpage: React.FC<UserpageProps> = () => {
  return (
    <div className="flex flex-grow">
      <div className="hidden sm:flex flex-shrink bg-lightGray sm:w-64">
        <UserSideBar />
      </div>
      <div className="flex flex-grow bg-gray sm:w-80 min-h-screen">
        <Profile />
      </div>
      <div className="hidden sm:flex flex-shrink bg-lightGray sm:w-64">
        <CommunitySideBar />
      </div>
    </div>
  );
};
