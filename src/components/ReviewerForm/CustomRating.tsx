import { Box, Rating, Typography } from "@mui/material";
import React from "react";
import HelperText from "../HelperText/HelperText";

interface CustomRatingProps {
  title: string;
  rating: number;
  handleSetRating: (value: number) => void;
  error?: string;
}

const CustomRating: React.FC<CustomRatingProps> = ({
  title,
  rating,
  handleSetRating,
  error,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Typography variant="body1">{title}</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            console.log(event);
            handleSetRating(newValue as number);
          }}
        />
      </Box>
      <HelperText
        style={{
          margin: "0",
          color: "#d32f2f",
          fontWeight: 400,
        }}
        error={error ?? ""}
      />
    </Box>
  );
};

export default CustomRating;
