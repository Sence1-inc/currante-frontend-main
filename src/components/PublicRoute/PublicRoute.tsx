import { Box } from "@mui/material";
import React, { useEffect } from "react";
import PublicTopNavigation from "../TopNavigation/PublicTopNavigation";

interface PublicRouteProps {
  component: React.ComponentType;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component }) => {
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <PublicTopNavigation />
      <Box
        sx={{
          marginTop: "64px",
        }}
      >
        <Component />
      </Box>
    </React.Fragment>
  );
};

export default PublicRoute;
