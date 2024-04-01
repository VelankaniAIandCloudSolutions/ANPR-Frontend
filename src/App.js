import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import AppHeader from "./components/Layout/AppHeader";
import AppSidebar from "./components/Layout/AppSidebar";
import VehicleReport from "./Views/VehicleReport";
import SignIn from "./Views/SignIn";

export default function App() {
  return (
    <div className="wrapper">
      <AppHeader />
      <AppSidebar />
      <div className="content-wrapper">
        <Router>
          <Switch>
            <Route path="/" exact component={VehicleReport} />
            <Route path="/vehicle-report" component={VehicleReport} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
