import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { RootState } from "redux/reducers";

interface RouteParams {
  [key: string]: string;
}
interface PrivateRouteProps extends RouteProps {
  fallbackComponent?: React.ReactNode;
  component: React.ComponentType<any>;
  title?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { fallbackComponent, component: Component, title, ...rest } = props;
  const isLoggedIn: any = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        const { match } = props;
        const params = match.params as RouteParams;
        return <Component {...props} {...params} title={title} />;
      }}
    />
  );
};

export default PrivateRoute;
