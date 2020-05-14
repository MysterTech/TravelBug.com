import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import LoginView from "./views/LoginView";
import UserManagerView from "./views/UserManagerView";
import AdminView from "./views/AdminView";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/Signup" component={Signup} />
      <PrivateRoute exact path="/user/:userId" component={LoginView} />
      <PrivateRoute
        exact
        path="/user_manager/:userId"
        component={UserManagerView}
      />
      <PrivateRoute exact path="/admin/:userId" component={AdminView} />
    </Switch>
  </div>
);

export default MainRouter;
