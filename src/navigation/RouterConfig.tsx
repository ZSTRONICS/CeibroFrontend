import { Router, Switch, Route, Redirect } from "react-router-dom";
import {
  Login,
  Connections,
  ForgetPassword,
  ResetPassword,
  Register,
  Projects,
  Dashboard,
  Profile,
  Tasks,
  Chat,
  AdminMain,
  RegisterNumberForm,
  RegisterConfirmationForm,
  TermsAndConditions,
  RegisterSetupProfile
} from "components";

// import AppLayout from "./AppLayout";
import PrivateRoute from "./PrivateRoute";

import { createBrowserHistory } from "history";
import DashboardLayout from "layouts/Dashboard/DashboardLayout";
export const appHistory = createBrowserHistory();

interface Configs {}

const RouterConfig: React.FC<Configs> = () => {
  return (
    <>
      <Router history={appHistory}>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          {/* <Route path="/verify-email" component={VerifyEmail} /> */}
          <Route path="/forgot-password" component={ForgetPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/register" component={RegisterNumberForm} />
          <Route path="/confirmation" component={RegisterConfirmationForm} />
          <Route path="/t&c" component={TermsAndConditions} />
          <Route path="/profile-setup" component={Register} />
          <Route path="/profile-pic" component={RegisterSetupProfile} />

          {/* <AppLayout> */}
          <DashboardLayout>
            <Route path="/profile" component={Profile} />
            <Route path="/projects" component={Projects} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/chat" component={Chat} />
            <Route path="/connections" component={Connections} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/admin" component={AdminMain} />
          </DashboardLayout>
          {/* </AppLayout> */}
        </Switch>
      </Router>
    </>
  );
};

export default RouterConfig;
