import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import {
  AdminMain,
  Connections,
  CreateNewTask,
  DrawingDetails,
  ForgetConfirmation,
  ForgetPassword,
  ForwardTask,
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
  Task,
  TermsAndConditions,
} from "components";
import NotFound from "components/NotFound";
import { createBrowserHistory } from "history";
import DashboardLayout from "layouts/Dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
export const appHistory = createBrowserHistory();

const RouterConfig = () => {
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
            <DashboardLayout>
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute
                path="/tasks/:subtask/:filterkey?/:taskuid?"
                component={Task}
              />
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
            <Route path="*" component={NotFound}></Route>
            {/* <Route path="/comming-soon" component={CommingSoon}></Route>
            <Redirect from="/" to="/comming-soon" /> */}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default RouterConfig;
