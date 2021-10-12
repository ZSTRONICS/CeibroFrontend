import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
import Projects from '../components/Projects/ProjectList/Project'
import Dashboard from '../components/Dashboard/Dashboard'
import Profile from '../components/Profile/Profile'
import Tasks from '../components/Tasks/ProjectList/Task'
import AppLayout from "./AppLayout";

interface Configs {
}

const RouterConfig: React.FC<Configs> = () => {
  return (
    <Router>
        <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <AppLayout>
              <Route path="/profile" component={Profile} />
              <Route path="/projects" component={Projects} />
              <Route path="/tasks" component={Tasks} />
              <Route path="/dashboard" component={Dashboard} />
            </AppLayout>
        </Switch>
    </Router>
  );
};

export default RouterConfig;
