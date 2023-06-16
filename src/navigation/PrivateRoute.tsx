import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { RootState } from "redux/reducers";

interface RouteParams {
  [key: string]: string;
}
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

  return (
    <Route
      {...rest}
      render={(props) => {
        const { match } = props;
        const params = match.params as RouteParams;
        return <Component {...props} {...params} />;
      }}
    />
  );
};

export default PrivateRoute;
