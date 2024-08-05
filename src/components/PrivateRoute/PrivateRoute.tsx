import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { initializeIsAuthenticated } from "../../redux/reducers/IsAuthenticatedReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { User } from "../../redux/type";
import BackButton from "../BackButton/BackButton";
import BackDrop from "../BackDrop/BackDrop";
import AdminBottomNavigation from "../BottomNavigation/AdminBottomNavigation";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import TopNavigation from "../TopNavigation/TopNavigation";

interface PrivateRouteProps {
  component: React.ComponentType;
  hasBackButton?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  hasBackButton = true,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const user: User = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/services");
    }
  }, []);

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
          marginTop: hasBackButton ? 0 : "64px",
          marginBottom: "84px",
        }}
      >
        {hasBackButton && <BackButton />}
        <BackDrop />
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
