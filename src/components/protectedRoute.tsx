import React from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  redirectPath: string;
} & RouteProps;

export default function ProtectedRoute({
  isAuthenticated,
  redirectPath,
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
