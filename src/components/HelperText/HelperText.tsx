import { Typography } from "@mui/material";
import React from "react";

interface HelperTextProps {
  error: string;
  style?: any;
}

const HelperText: React.FC<HelperTextProps> = ({ error, style }) => {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        color: error ? "red" : "rgba(0, 0, 0, 0.54)",
        marginTop: "8px",
        fontSize: "0.75rem",
        ...style,
      }}
    >
      {error}
    </Typography>
  );
};

export default HelperText;
