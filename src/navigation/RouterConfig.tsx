import { Suspense } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import {
  Login,
  Connections,
  MockTaskApis,
  ForgetPassword,
  ResetPassword,
  Register,
  Projects,
  ProjectLocations,
  Profile,
  Tasks,
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
import CreateNewTask from "components/Tasks/Create-Task/CreateNewTask";
import ForwardTask from "components/Tasks/Forward-Task";
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
              <PrivateRoute path="/create-new-task" component={CreateNewTask} />
              <PrivateRoute
                path="/forward-task/:taskId"
                component={ForwardTask}
              />
              <PrivateRoute path="/tasks" component={Tasks} />
              <PrivateRoute path="/projects" component={Projects} />
              <PrivateRoute
                exact
                path="/project/:projectId"
                component={ProjectLocations}
              />
              <PrivateRoute path="/projects" component={Projects} />
              <PrivateRoute
                exact
                path="/drawingDetail"
                component={DrawingDetails}
              />
              <PrivateRoute path="/connections" component={Connections} />
              <PrivateRoute path="/admin" component={AdminMain} />
              <PrivateRoute path="/mockTaskApis" component={MockTaskApis} />
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
