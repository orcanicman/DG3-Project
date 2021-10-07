import React from "react";
import { CommunitySideBar } from "../components/CommunitySideBar";
import { Posts } from "../components/Posts";
import { UserSideBar } from "../components/UserSideBar";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className="flex flex-grow">
      <div className="hidden sm:flex flex-shrink bg-lightGray sm:w-64">
        <UserSideBar />
      </div>
      <div className="flex flex-grow bg-gray pl-4 pr-4 sm:w-80 min-h-screen">
        <Posts />
      </div>
      <div className="hidden sm:flex flex-shrink bg-lightGray sm:w-64">
        <CommunitySideBar />
      </div>
    </div>
  );
};
