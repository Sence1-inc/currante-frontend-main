import { Fab, useTheme } from "@mui/material";
import React from "react";
import "./FabButton.css";

interface FabButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactNode;
  text: string;
  styles?: any;
}

const FabButton: React.FC<FabButtonProps> = ({
  handleClick,
  icon,
  text,
  styles,
}) => {
  const theme = useTheme();
  return (
    <Fab
      className="fab"
      onClick={handleClick}
      variant="extended"
      sx={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: "secondary.main",
        color: "white",
        padding: "20px",
        "&:hover": {
          backgroundColor: "primary.main",
        },
        ...styles,
      }}
    >
      {icon}
      {"  "}
      {(window.innerWidth > theme.breakpoints.values.sm || text.length < 10) &&
        text}
    </Fab>
  );
};

export default FabButton;
