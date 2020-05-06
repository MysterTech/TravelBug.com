import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/Signup" component={Signup} />
    </Switch>
  </div>
);

export default MainRouter;
