import { Box, CircularProgress } from "@mui/material";
import {
  AdminMain,
  Connections,
  DrawingDetails,
  ForgetConfirmation,
  ForgetPassword,
  Login,
  MockTaskApis,
  Profile,
  ProjectLocations,
  Projects,
  Register,
  RegisterAddProfilePic,
  RegisterConfirmationForm,
  RegisterNumberForm,
  ResetPassword,
  Tasks,
  TermsAndConditions,
} from "components";
import { Suspense } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Comment from "components/Tasks/Comment";
import CreateNewTask from "components/Tasks/Create-Task/CreateNewTask";
import ForwardTask from "components/Tasks/Forward-Task";
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
            <PrivateRoute path="/create-new-task" component={CreateNewTask} />
            <PrivateRoute
              path="/forward-task/:taskId"
              component={ForwardTask}
            />
            <PrivateRoute
              path="/comment-task/:taskId"
              component={Comment}
              title={"New comment"}
            />
            <PrivateRoute
              path="/done-task/:taskId"
              component={Comment}
              title={"Done comment"}
            />
            <DashboardLayout>
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/tasks/:subtask?/:filterkey?/:taskuid?" component={Tasks} />
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
