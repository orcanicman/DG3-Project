import React from "react";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  return (
    <div className="flex">
      <div className="w-1/4"></div>
      <div className="w-2/4 flex flex-col items-center">
        <h1 className="text-4xl font-bold m-4">Register</h1>
        <form className="flex flex-col items-center mt-16">
          <label className="font-bold">Email</label>
          <input className="border-b mb-8" placeholder="email" />
          <label className="font-bold">Username</label>
          <input className="border-b mb-8" placeholder="username" />
          <label className="font-bold">Password</label>
          <input
            className="border-b mb-8"
            placeholder="password"
            type="password"
          />
          <button className="border-2 border-black rounded p-1">Submit</button>
        </form>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
};
