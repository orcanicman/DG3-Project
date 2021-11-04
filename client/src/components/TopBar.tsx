import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { apiAxios } from "../App";
import { ActionType } from "../context/Actions";
import { UserContext } from "../context/UserContext";

interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = () => {
  const { dispatch, state } = useContext(UserContext);
  const user = state.user;

  const handleLogout = async () => {
    try {
      const res = await apiAxios.post("/auth/logout");
      dispatch({ type: ActionType.Logout });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex bg-white pb-4 pt-4 sticky top-0 z-50">
      <div className="hidden sm:flex flex-shrink sm:w-64">socials</div>
      <div className="flex flex-grow justify-between pl-4 pr-4 sm:w-80">
        <Link to="/">Home</Link>
        <div className="sm:hidden">Searchbarr</div>
        {user ? (
          <a className="cursor-pointer" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <Link to="login">Login</Link>
        )}
      </div>
      <div className="hidden sm:flex flex-shrink sm:w-64">SearchBar</div>
    </header>
  );
};
