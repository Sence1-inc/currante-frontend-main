import { MapsHomeWorkRounded } from "@mui/icons-material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HomeIcon from "@mui/icons-material/Home";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector } from "../../redux/store";

export default function SimpleBottomNavigation() {
  const user = useAppSelector((state) => state.user);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname.includes("chat")) {
      setValue(2);
    } else if (pathname.includes("services")) {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [pathname]);

  console.log("value", value);

  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    if (newValue === 0) navigate("/services");
    else if (newValue === 1) navigate("/jobs");
    else if (newValue === 2) navigate("/chats");
  };

  return (
    <Box
      sx={{ width: "100%", position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
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
        {user.logged_in_as === "employer" && (
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            onClick={() => navigate("/services")}
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
        )}
        <BottomNavigationAction
          label="Job List"
          icon={<MapsHomeWorkRounded />}
          onClick={() => navigate("/jobs")}
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
          label="Messages"
          icon={<ChatBubbleIcon />}
          onClick={() => navigate("/chats")}
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
