import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface SecureRouteProps {
  isAuthenticated: boolean;
  requiredRole?: string;
  userRole?: string;
  redirectPath?: string;
}

const SecureRoute: React.FC<SecureRouteProps> = ({
  isAuthenticated,
  requiredRole,
  userRole,
  redirectPath = '/login',
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default SecureRoute;
