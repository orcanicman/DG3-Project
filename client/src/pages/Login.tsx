import React, { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { apiAxios } from "../App";
import { ActionType } from "../context/Actions";
import { UserContext } from "../context/UserContext";
import { setAccessToken } from "../functions/accessToken";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: ActionType.LoginStart });
    try {
      const res = await apiAxios.post("/auth/login", {
        username,
        password,
      });
      if (res && res.data.accessToken) {
        setAccessToken(res.data.accessToken);
      }
      dispatch({ type: ActionType.LoginSuccess, payload: res.data });
    } catch (error) {
      dispatch({ type: ActionType.LoginFailure });
    }
  };

  return (
    <div className="flex">
      <div className="flex-shrink sm:w-64"></div>
      <div
        className="flex-grow flex flex-col p-4 sm:p-0 sm:items-center"
        style={{ marginTop: "15%" }}
      >
        <form className="flex flex-col mt-8 sm:w-80" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold mb-8 self-start">Login</h1>
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
          <button className="border-2 border-black p-1">Submit</button>
          <div className="flex flex-wrap justify-between mt-4">
            <span className="underline pr-4">Forgot password?</span>
            <Link to="/register">
              <span className="underline">Register account</span>
            </Link>
          </div>
        </form>
      </div>
      <div className="flex-shrink sm:w-64"></div>
    </div>
  );
};
