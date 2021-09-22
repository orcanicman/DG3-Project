import React from "react";
import { Link } from "react-router-dom";

interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = () => {
  return (
    <header className="flex bg-white pb-4 pt-4 sticky top-0">
      <div className="flex flex-shrink sm:w-64">socials</div>
      <div className="flex flex-grow justify-between pl-4 pr-4 sm:w-80">
        <Link to="/">Home</Link>
        <Link to="login">Login</Link>
      </div>
      <div className="flex flex-shrink sm:w-64">SearchBar</div>
    </header>
  );
};
