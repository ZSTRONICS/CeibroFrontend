import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import {
  AdminMain,
  Connections,
  CreateNewTask,
  ForgetConfirmation,
  ForgetPassword,
  ForwardTask,
  Location,
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
import { createBrowserHistory } from "history";
import DashboardLayout from "layouts/Dashboard/DashboardLayout";
import { LOGIN_ROUTE } from "utills/axios";
import CommingSoon from "./CommingSoon";
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
            <Route path="/comming-soon" component={CommingSoon} />
            <Redirect exact from="/" to="/comming-soon" />

            {/* <Redirect exact from="/" to={LOGIN_ROUTE} /> */}

            <Route path={LOGIN_ROUTE} component={Login} />
            <Route
              path="/playstore"
              component={() => {
                window.location.href =
                  "https://play.google.com/store/apps/details?id=com.zstronics.ceibro";
                return <></>;
              }}
            />
            <Route path="/forgot-password" component={ForgetPassword} />
            <Route path="/forget-confirmation" component={ForgetConfirmation} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/register" component={RegisterNumberForm} />
            <Route path="/confirmation" component={RegisterConfirmationForm} />
            <Route path="/t&c" component={TermsAndConditions} />
            <Route path="/profile-setup" component={Register} />

            <Redirect exact from="/tasks" to="/tasks/allTaskFromMe" />
            <PrivateRoute
              exact
              path="/profile-pic"
              component={RegisterAddProfilePic}
            />
            <PrivateRoute path="/create-new-task" component={CreateNewTask} />
            <PrivateRoute
              exact
              path="/forward-task/:taskId"
              component={ForwardTask}
            />
            <DashboardLayout>
              <PrivateRoute
                exact
                path="/tasks/:subtask/:filterkey?/:taskuid?"
                component={Task}
              />
              <PrivateRoute
                exact
                path="/project/:projectId"
                component={ProjectLocations}
              />
              <PrivateRoute path="/projects" component={Projects} />
              <PrivateRoute exact path="/location" component={Location} />
              <PrivateRoute path="/connections" component={Connections} />
              <PrivateRoute path="/admin" component={AdminMain} />
              <PrivateRoute
                exact
                path="/mockTaskApis"
                component={MockTaskApis}
              />
              <PrivateRoute
                exact
                path="/profile/:deleteAccount?"
                component={Profile}
              />
              {/* <Route path="/*" component={NotFound} /> */}
            </DashboardLayout>
            {/* <Route path="/comming-soon" component={CommingSoon}></Route>
            <Redirect from="/" to="/comming-soon" /> */}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default RouterConfig;
