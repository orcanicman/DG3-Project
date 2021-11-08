import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { apiAxios } from "../App";
import { ActionType } from "../context/Actions";
import { UserContext } from "../context/UserContext";
import defaultImg from "../Images/default.jpg";

interface UserSideBarProps {}

export const UserSideBar: React.FC<UserSideBarProps> = () => {
  const { state, dispatch } = useContext(UserContext);
  const user = state.user;

  const handleLogout = async () => {
    try {
      await apiAxios.post("/auth/logout");
      dispatch({ type: ActionType.Logout });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <img src={defaultImg} alt="" className="w-3/4 rounded-full p-4" />
      <Link to={`user/${user?.tag}`} className="text-lg font-bold">
        {user?.name}
      </Link>
      <Link to={`user/${user?.tag}`} className="text-sm font-light">
        @{user?.tag}
      </Link>
      <div className=" w-3/4 p-2">{user?.profile?.bio}</div>
      <Link to={`/`} className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer">
        Home
      </Link>
      <div className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer">
        Settings
      </div>
      <Link
        to={`user/${user?.tag}`}
        className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer"
      >
        Profile
      </Link>
      <div
        onClick={handleLogout}
        className="text-lg hover:bg-gray w-3/4 p-2 cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
};
