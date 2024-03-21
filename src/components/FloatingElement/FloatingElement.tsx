import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, Paper, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

interface FloatingElementProps {
  children: React.ReactNode;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  anchorEl,
  handleClose,
}) => {
  const theme = useTheme();
  const isLandscape = useMediaQuery(theme.breakpoints.up("sm"));
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "floating-paper" : undefined;

  return (
    <Popover
      id={id}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: { style: { borderRadius: "16px" } },
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#F5F6FA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "90vw", md: "50vw" },
          overflowY: "hidden",
          height: { xs: "90vh", sm: isLandscape ? "85vh" : "50vh" },
          border: "none",
        }}
      >
        <IconButton
          aria-label="close"
          sx={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={handleClose}
        >
          <ClearIcon />
        </IconButton>
        {children}
      </Paper>
    </Popover>
  );
};

export default FloatingElement;