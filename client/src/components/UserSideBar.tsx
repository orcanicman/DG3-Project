import React from "react";
import defaultImg from "../Images/default.jpg";

interface UserSideBarProps {}

export const UserSideBar: React.FC<UserSideBarProps> = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <img src={defaultImg} alt="" className="  w-3/4 rounded-full p-4" />

      <div className="text-lg hover:bg-gray w-3/4 p-2 rounded-md cursor-pointer">
        Username
      </div>
      <div className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer">
        UserTag
      </div>
      <div className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer">
        Biography
      </div>
      <div className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer">foto</div>
      <div className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer">
        Settings
      </div>
    </div>
  );
};
