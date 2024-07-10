import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { initializeIsAuthenticated } from "../../redux/reducers/IsAuthenticatedReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AdminBottomNavigation from "../BottomNavigation/AdminBottomNavigation";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import TopNavigation from "../TopNavigation/TopNavigation";

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const dispatch = useAppDispatch();
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/check");
        setAuthenticated(response.data.valid);
        dispatch(initializeIsAuthenticated(response.data.valid));
      } catch (error) {
        if (error) {
          setAuthenticated(false);
          dispatch(initializeIsAuthenticated(false));
        }
      }
    };

    checkAuthentication();
  }, [setAuthenticated]);

  if (authenticated === null) {
    return null;
  }

  return authenticated ? (
    <React.Fragment>
      <TopNavigation />
      <Box
        sx={{
          marginTop: "64px",
          marginBottom: "84px",
        }}
      >
        <Component />
      </Box>
      {user.logged_in_as !== "admin" && <BottomNavigation />}
      {user.logged_in_as === "admin" && <AdminBottomNavigation />}
    </React.Fragment>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default PrivateRoute;
