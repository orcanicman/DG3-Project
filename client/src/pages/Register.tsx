import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiAxios } from "../App";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await apiAxios.post("/user/register", {
        tag: username,
        email,
        password,
        name: displayName,
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="flex">
      <div className="flex-shrink sm:w-64"></div>
      <div className="flex-grow flex flex-col p-4 sm:p-0 sm:items-center">
        <form className="flex flex-col mt-8 sm:w-80" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold mb-8 self-start">Regsiter</h1>
          <label className="font-bold self-start pb-1">Email</label>
          <input
            className="border p-1 mb-8"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="font-bold self-start pb-1">Username</label>
          <input
            className="border p-1 mb-8"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label className="font-bold self-start pb-1">Password</label>
          <input
            className="border p-1 mb-8"
            placeholder="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label className="font-bold self-start pb-1">Display name</label>
          <input
            className="border p-1 mb-8"
            placeholder="display name"
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
          <button className="border-2 border-black p-1">Submit</button>
          <div className="flex mt-4">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div className="flex-shrink sm:w-64"></div>
    </div>
  );
};
