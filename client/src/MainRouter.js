import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import LoginView from "./views/LoginView";
import EditTrip from "./trip/EditTrip";
import CreateTrip from "./trip/CreateTrip";
import CreateUser from "./user/CreateUser";
import EditUser from "./user/EditUser";
import UserManagerView from "./views/UserManagerView";
import AdminView from "./views/AdminView";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/Signup" component={Signup} />
      <PrivateRoute exact path="/user/:userId" component={LoginView} />
      <PrivateRoute exact path="/trip/new/" component={CreateTrip} />
      <PrivateRoute exact path="/trip/:tripId" component={EditTrip} />
      <PrivateRoute
        exact
        path="/user_manager/:userId"
        component={UserManagerView}
      />
      <PrivateRoute
        exact
        path="/user_manager/user/new/"
        component={CreateUser}
      />
      <PrivateRoute exact path="/user/edit/:userId" component={EditUser} />
      <PrivateRoute exact path="/admin/:userId" component={AdminView} />
    </Switch>
  </div>
);

export default MainRouter;
