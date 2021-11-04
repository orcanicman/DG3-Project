import React, { createContext, useEffect, useReducer } from "react";
import { IUser } from "../types/IUser";
import { theActions } from "./Actions";
import { LoginReducer } from "./Reducer";

export interface theState {
  user: IUser | null;
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: theState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  isFetching: false,
  error: false,
};

export const UserContext = createContext<{
  state: theState;
  dispatch: React.Dispatch<theActions>;
}>({
  state: INITIAL_STATE,
  dispatch: () => undefined,
});

export const UserContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
