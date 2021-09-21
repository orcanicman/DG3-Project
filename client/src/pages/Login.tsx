import React from "react";
import { Link } from "react-router-dom";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  return (
    <div className="flex">
      <div className="flex-shrink sm:w-64"></div>
      <div className="flex-grow flex flex-col p-4 sm:p-0 sm:items-center">
        <form className="flex flex-col mt-8 sm:w-80">
          <h1 className="text-4xl font-bold mb-8 self-start">Login</h1>
          <label className="font-bold self-start pb-1">Username</label>
          <input className="border p-1 mb-8" placeholder="username" />
          <label className="font-bold self-start pb-1">Password</label>
          <input
            className="border p-1 mb-8"
            placeholder="password"
            type="password"
          />
          <button className="border-2 border-black p-1">Submit</button>
          <div className="flex flex-wrap justify-between mt-4">
            <span className="underline pr-4">Forgot password?</span>
            <Link to="/register"><span className="underline">Register account</span></Link>
          </div>
        </form>
      </div>
      <div className="flex-shrink sm:w-64"></div>
    </div>
  );
};
