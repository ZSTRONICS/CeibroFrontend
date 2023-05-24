import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { RootState } from "../redux/reducers";

interface PrivateRouteProps extends RouteProps {
  fallbackComponent?: React.ReactNode;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { fallbackComponent, component: Component, ...rest } = props;
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />}  />;
};

export default PrivateRoute;
