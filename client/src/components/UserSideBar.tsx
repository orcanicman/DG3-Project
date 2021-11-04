import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import defaultImg from "../Images/default.jpg";

interface UserSideBarProps {}

export const UserSideBar: React.FC<UserSideBarProps> = () => {
  const { dispatch, state } = useContext(UserContext);
  const user = state.user;

  return (
    <div className="flex flex-col w-full items-center">
      <img src={defaultImg} alt="" className="  w-3/4 rounded-full p-4" />
      <div className="text-lg ">{user?.name}</div>
      <div className="text-sm font-light">@{user?.tag}</div>
      <div className=" w-3/4 p-2">{user?.profile?.bio}</div>

      <div className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer">
        Settings
      </div>
      <div className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer">
        Profile
      </div>
    </div>
  );
};
