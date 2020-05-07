import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import TripsByUserId from "./trip/TripsByUserId";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/Signup" component={Signup} />
      <PrivateRoute exact path="/trips/:userId" component={TripsByUserId} />
    </Switch>
  </div>
);

export default MainRouter;
