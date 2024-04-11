import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import TopNavigation from "../TopNavigation/TopNavigation";

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    setAuthenticated(true);
  }, [setAuthenticated]);

  if (authenticated === null) {
    return null;
  }

  return authenticated ? (
    <React.Fragment>
      <TopNavigation />
      <Component />
      <BottomNavigation />
    </React.Fragment>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default PrivateRoute;
