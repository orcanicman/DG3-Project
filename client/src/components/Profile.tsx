import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import bannerImg from "../Images/banner.jpg";
import profilePicture from "../Images/default.jpg";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const { state, dispatch } = useContext(UserContext);
  const user = state.user;

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
      <div className="border flex flex-col">
        <div className="border flex py-10">
          <div className="w-72"></div>
          <div>Bio</div>
        </div>
        <div className="border flex justify-between">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>
    </div>
  );
};
