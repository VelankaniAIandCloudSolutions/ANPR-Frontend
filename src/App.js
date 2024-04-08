import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Views/Dashboard";
import AppHeader from "./components/Layout/AppHeader";
import AppSidebar from "./components/Layout/AppSidebar";
import VehicleReport from "./Views/VehicleReport";
import LogIn from "./Views/Accounts/LogIn";

export default function App() {
  // const authState = useSelector((state) => state.auth);
  // const [isAuth, setIsAuth] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("access_token") !== null) {
  //     setIsAuth(true);
  //   }
  // }, [isAuth]);

  // if (isAuth) {
  //   return (
  //     <div className="wrapper">
  //       <AppHeader />
  //       <AppSidebar />
  //       <div className="content-wrapper">
  //         <Router>
  //           <Switch>
  //             <Route path="/" exact component={VehicleReport} />
  //             <Route path="/vehicle-report" component={VehicleReport} />
  //             <Route path="/login" component={SignIn} />
  //           </Switch>
  //         </Router>
  //       </div>
  //     </div>
  //   );
  // }
  // else{
  //   return <SignIn/>
  // }

  return (
    <div className="wrapper">
      <AppHeader />
      <AppSidebar />
      <div className="content-wrapper">
        <Router>
          <Switch>
            <Route path="/" exact component={VehicleReport} />
            <Route path="/vehicle-report" component={VehicleReport} />
            <Route path="/login" component={LogIn} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
