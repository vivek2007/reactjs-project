import React, { useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "./context/auth";
import PrivateRoute from './PrivateRoute';
/*------ Pages-----*/
import { Home } from "./Pages/Home";
import ScrollToTopRoute from "./ScrollToTopRoute";
import Bloglist from "./Pages/Bloglist";
import BillionClicks from "./Pages/BillionClicks";
import Faq from "./Pages/Faq";
import Contact from "./Pages/Contact";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword"
import ChangePassword from "./Pages/ChangePassword"
import Order from "./Pages/Order";
import NotFound from "./Pages/404";
import DashboardAlpha from "./Pages/dashboard/alpha"
import DashboardBeta from "./Pages/dashboard/beta"
import DashboardGamma from "./Pages/dashboard/gamma"
import DashboardCrypto from "./Pages/dashboard/crypto"

const App = () => {

  const [authTokens, setAuthTokens] = useState();
  const [username, setUserName] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
    setUserName(localStorage.getItem(username))
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens  }}>
        <Router>
          <Switch>
            <ScrollToTopRoute exact={true} path={"/"} component={Home} />
            <ScrollToTopRoute path="/learn" component={Bloglist} />
            <ScrollToTopRoute path="/contat" component={Contact} />
            <ScrollToTopRoute path="/faq" component={Faq} />
            <ScrollToTopRoute path="/sign-in" component={SignIn} />
            <ScrollToTopRoute path="/sign-up" component={SignUp} />
            <ScrollToTopRoute path="/forgot-password" component={ForgotPassword} />
            <ScrollToTopRoute path="/change-password/:token" component={ChangePassword} />
           {/* <ScrollToTopRoute path="/billion-clicks" component={BillionClicks} /> --> */ }
            <ScrollToTopRoute>
              <PrivateRoute path="/order" component={Order} />
            </ScrollToTopRoute>
            <ScrollToTopRoute>
              <PrivateRoute path="/dashboard" component={DashboardAlpha}  />
            </ScrollToTopRoute>
            <ScrollToTopRoute>
              <PrivateRoute path="/dashboard/beta" component={DashboardBeta} />
            </ScrollToTopRoute>
            <ScrollToTopRoute>
              <PrivateRoute path="/dashboard/gamma" component={DashboardGamma} />
            </ScrollToTopRoute>
            <ScrollToTopRoute>
              <PrivateRoute path="/dashboard/crypto" component={DashboardCrypto} />
            </ScrollToTopRoute>

            <ScrollToTopRoute component={NotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
}

export default App;
