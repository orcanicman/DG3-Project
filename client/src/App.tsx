import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Single } from "./pages/Single";
import { Userpage } from "./components/Userpage";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import { getAccessToken, setAccessToken } from "./functions/accessToken";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { ActionType } from "./context/Actions";

export const apiAxios = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

export const JWTAxios = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { authorization: `Bearer ${getAccessToken()}` },
  withCredentials: true,
});

JWTAxios.interceptors.request.use(
  async (config) => {
    try {
      const token = getAccessToken();
      const { exp } = jwtDecode<JwtPayload>(token);
      if (Date.now() >= exp! * 1000) {
        const response = await apiAxios.post("/auth/refresh");
        setAccessToken(response.data.accessToken);
        console.log(`Bearer ${getAccessToken()}`);
      }
      config.headers["authorization"] = `Bearer ${getAccessToken()}`;
    } catch (error) {
      console.log(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch, state } = useContext(UserContext);
  const user = state.user;

  const refreshToken = useCallback(async () => {
    try {
      const response = await apiAxios.post("/auth/refresh");
      setAccessToken(response.data.accessToken);
      setIsLoading(false);
    } catch (error) {
      dispatch({ type: ActionType.Logout });
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    user && refreshToken();
    setIsLoading(false);
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        {isLoading ? (
          <div>loading</div>
        ) : (
          <Switch>
            <Route exact path="/">
              {user ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/post/:postId">
              <Single />
            </Route>
            <Route exact path="/user/:tag">
              <Userpage />
            </Route>
            <Route exact path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/register">
              {user ? <Redirect to="/" /> : <Register />}
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
