import React, { useState } from "react";
import { TopBar } from "./components/TopBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Single } from "./pages/Single";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    setIsLoading(false);
  });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        {isLoading ? (
          <div>loading</div>
        ) : (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/post/:postId">
              <Single />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
