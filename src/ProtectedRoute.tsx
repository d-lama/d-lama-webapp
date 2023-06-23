import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface IProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAdmin?: boolean;
  authenticationPath: string;
  nonAdminPath?: string;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  isAuthenticated,
  isAdmin,
  authenticationPath,
  nonAdminPath,
  ...routeProps
}) => {
  if (isAuthenticated) {
    if (isAdmin != null && nonAdminPath != null && !isAdmin) {
      return <Redirect to={nonAdminPath} />;
    }
    return <Route {...routeProps} />;
  }
  return <Redirect to={authenticationPath} />;
};
