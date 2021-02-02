import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthPage } from "../pages/auth/auth";
import { IntroPage } from "../pages/auth/intro";
import { PageNotFound } from "../pages/404";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account" exact>
          <AuthPage />
        </Route>
        <Route path="/login" exact>
          <AuthPage />
        </Route>
        <Route path="/" exact>
          <IntroPage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};
