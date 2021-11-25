import React, { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import bannerImg from "../Images/banner.jpg";
import profilePicture from "../Images/default.jpg";
import { Link } from "react-router-dom";
import { Posts } from "../components/Posts";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const { state, dispatch } = useContext(UserContext);
  const user = state.user;

  return (
    <div className="flex flex-col w-full bg-gray rounded">
      <div className="relative w-full ">
        <img src={bannerImg} alt="" className="bg-cover max-h-72 w-full " />
        <img
          src={profilePicture}
          alt=""
          className="w-1/4 rounded-full  absolute top-1/2 border-8 m-2 border-lightGray"
        />
      </div>
      <div className="flex flex-col p-4" style={{ marginTop: "10%" }}>
        <div className="flex flex-col justify-center">
          <Link to={`/user/${user?.tag}`} className="text-lg font-bold">
            {user?.name}
          </Link>

          <Link to={`/user/${user?.tag}`} className="text-sm font-light">
            @{user?.tag}
          </Link>
        </div>
        <div className=" flex ">
          <div className=" flex py-4">Bio</div>
        </div>
        <div className="flex row">
          <button className="bg-gray hover:bg-lightGray text-black font-bold px-2 py-2  border border-black rounded w-1/2 ">
            Likes
          </button>
          <button className="bg-gray hover:bg-lightGray text-black font-bold px-2 py-2  border border-black rounded w-1/2">
            Posts
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-grow flex-col bg-white min-h-screen w-full">
          <Posts />
        </div>
      </div>
    </div>
  );
};
