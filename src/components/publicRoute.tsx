import React, { LazyExoticComponent } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

type JSXComponent = () => JSX.Element;

type PublicRouteProps = RouteProps & {
  isAuthenticated: boolean;
  component: LazyExoticComponent<JSXComponent> | JSXComponent;
};

export default function PublicRoute({
  isAuthenticated,
  component: Component,
  ...rest
}: PublicRouteProps) {
  return (
    <Route
      {...rest}
      Component={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
}
