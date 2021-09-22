import React, { useState } from "react";
import { TopBar } from "./components/TopBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    setIsLoading(false);
  });

  return (
    <Router>
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
        </Switch>
      )}
    </Router>
  );
}

export default App;
