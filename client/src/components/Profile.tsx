import React from "react";
import bannerImg from "../Images/banner.jpg";
import profilePicture from "../Images/default.jpg";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  return (
    <div className="flex flex-col w-full bg-gray rounded">
      <div className="relative w-full">
        <img src={bannerImg} alt="" className="bg-cover max-h-72 w-full " />
        <img
          src={profilePicture}
          alt=""
          className="w-1/4 rounded-full  absolute top-1/2 border-8 m-2 border-lightGray"
        />
      </div>
      <div className=""></div>
    </div>
  );
};
