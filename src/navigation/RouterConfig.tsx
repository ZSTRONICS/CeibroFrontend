import { Suspense } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import {
  Login,
  Connections,
  ForgetPassword,
  ResetPassword,
  Register,
  Projects,
  ProjectLocations,
  // Dashboard,
  Profile,
  Tasks,
  // Chat,
  AdminMain,
  RegisterNumberForm,
  RegisterConfirmationForm,
  TermsAndConditions,
  RegisterAddProfilePic,
  ForgetConfirmation,
  DrawingDetails,
} from "components";

import PrivateRoute from "./PrivateRoute";

import { createBrowserHistory } from "history";
import DashboardLayout from "layouts/Dashboard/DashboardLayout";
export const appHistory = createBrowserHistory();

interface Configs {}

const RouterConfig: React.FC<Configs> = () => {
  return (
    <>
      <Router history={appHistory}>
        <Suspense
          fallback={
            <Box sx={{ textAlign: "center", mt: "10%" }}>
              <CircularProgress size={35} />
            </Box>
          }
        >
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            {/* <Route path="/verify-email" component={VerifyEmail} /> */}
            <Route path="/forgot-password" component={ForgetPassword} />
            <Route path="/forget-confirmation" component={ForgetConfirmation} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/register" component={RegisterNumberForm} />
            <Route path="/confirmation" component={RegisterConfirmationForm} />
            <Route path="/t&c" component={TermsAndConditions} />
            <Route path="/profile-setup" component={Register} />
            <PrivateRoute
              path="/profile-pic"
              component={RegisterAddProfilePic}
            />

            <DashboardLayout>
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/tasks" component={Tasks} />
              <PrivateRoute path="/projects" component={DrawingDetails} />
              <PrivateRoute
                exact
                path="/drawing/:id"
                component={ProjectLocations}
              />
              <PrivateRoute
                exact
                path="/drawingDetail/:id"
                component={DrawingDetails}
              />
              <PrivateRoute path="/connections" component={Connections} />
              <PrivateRoute path="/admin" component={AdminMain} />
              {/* <Route path="/chat" component={Chat} /> */}
              {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
            </DashboardLayout>
            {/* todo later */}
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default RouterConfig;
