import React from "react";
import { useLocation } from "react-router";
import { CommunitySideBar } from "../components/CommunitySideBar";
import { SinglePost } from "../components/SinglePost";
import { UserSideBar } from "../components/UserSideBar";
import { IPost } from "../types/IPost";

interface SingleProps {}

export const Single: React.FC<SingleProps> = () => {
  return (
    <div className="flex">
      <div className="hidden sm:flex flex-shrink bg-lightGray sm:w-64">
        <UserSideBar />
      </div>
      <div className="flex flex-grow bg-gray pl-4 pr-4 sm:w-80 min-h-screen">
        <SinglePost />
      </div>
      <div className="hidden sm:flex flex-shrink bg-lightGray sm:w-64">
        <CommunitySideBar />
      </div>
    </div>
  );
};
