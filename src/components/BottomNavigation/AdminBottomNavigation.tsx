import { Man, Money } from "@mui/icons-material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function AdminBottomNavigation() {
  const [value, setValue] = useState<number | null>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname.includes("payments")) {
      setValue(0);
    } else if (pathname.includes("users")) {
      setValue(1);
    } else {
      setValue(null);
    }
  }, [pathname]);

  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    if (newValue === 0) navigate("/admin");
    else if (newValue === 1) navigate("/users");
  };

  return (
    <Box
      sx={{ width: "100%", position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log(event);
          handleNavigation(newValue);
        }}
        sx={{
          backgroundColor: "#A1B5DE",
          display: "flex",
          height: "100%",
          ".Mui-selected .MuiSvgIcon-root": {
            backgroundColor: "#495D92", // Color when item is active
            transition: "none !important",
          },
          ".Mui-selected": {
            transition: "none !important",
          },
          ".css-lo76r6-MuiBottomNavigationAction-label.Mui-selected": {
            fontSize: "12px !important",
            transition: "none !important",
          },
          ".css-fwz4r0-MuiBottomNavigation-root .Mui-selected .MuiSvgIcon-root":
            {
              fontSize: "12px !important",
              transition: "none !important",
            },
          ".MuiToolbar-root.MuiToolbar-regular.css-1sc8z0h-MuiToolbar-root  ": {
            minHeight: "0px !important",
          },
        }}
      >
        <BottomNavigationAction
          label="Payments"
          icon={<Money />}
          onClick={() => navigate("/admin")}
          sx={{
            fontFamily: "Poppins !important",
            fontWeight: "600",
            fontSize: "12px",
            transition: "none !important",
            webkitTransition: "none !important",
            height: "80px",
            ".css-lo76r6-MuiBottomNavigationAction-label": {
              fontFamily: "Poppins",
              fontSize: "12px",
              color: "#FFFFFF",
              letterSpacing: "0.5px",
              marginTop: "5px",
            },
            ".MuiSvgIcon-root": {
              width: "64px",
              borderRadius: "16px",
              padding: "3px",
              color: "#FFFFFF",
            },
          }}
        />

        <BottomNavigationAction
          label="Users"
          icon={<Man />}
          onClick={() => navigate("/users")}
          sx={{
            fontFamily: "Poppins !important",
            fontWeight: "600",
            fontSize: "12px",
            transition: "none !important",
            webkitTransition: "none !important",
            height: "80px",
            ".css-lo76r6-MuiBottomNavigationAction-label": {
              fontFamily: "Poppins",
              fontSize: "12px",
              color: "#FFFFFF",
              letterSpacing: "0.5px",
              marginTop: "5px",
            },
            ".MuiSvgIcon-root": {
              width: "64px",
              borderRadius: "16px",
              padding: "3px",
              color: "#FFFFFF",
            },
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
