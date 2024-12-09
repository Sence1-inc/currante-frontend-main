import { CircularProgress, Fab } from "@mui/material";
import React from "react";
import "./FabButton.css";

interface FabButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactNode;
  text: string;
  styles?: any;
  isDisabled?: boolean;
}

const FabButton: React.FC<FabButtonProps> = ({
  handleClick,
  icon,
  text,
  styles,
  isDisabled = false,
}) => {
  return (
    <Fab
      disabled={isDisabled}
      className="fab"
      onClick={handleClick}
      variant="extended"
      sx={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: "secondary.main",
        color: "white",
        padding: "14px",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "common.white",
        },
        ...styles,
      }}
    >
      {isDisabled ? (
        <CircularProgress
          size={20}
          sx={{ color: "common.white", marginRight: "6px" }}
        />
      ) : (
        icon
      )}{" "}
      {text}
    </Fab>
  );
};

export default FabButton;
