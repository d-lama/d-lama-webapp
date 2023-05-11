import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface IProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  ...routeProps
}) => {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  }
  return <Redirect to={authenticationPath} />;
};
