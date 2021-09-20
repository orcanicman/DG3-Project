import React from "react";

interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = () => {
  return (
    <header className="flex bg-black text-white p-4">
      <div className="w-1/4">socials</div>
      <div className="w-2/4">Paths</div>
      <div className="w-1/4">something else</div>
    </header>
  );
};
