import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import AppHeader from "./components/Layout/AppHeader";
import AppSidebar from "./components/Layout/AppSidebar";
import VehicleReport from "./Views/VehicleReport";

export default function App() {
  return (
    <div className="wrapper">
      <AppHeader />
      <AppSidebar />
      <div className="content-wrapper">
        <Router>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/vehicle-report" component={VehicleReport} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
