import { Box, Rating, Typography } from "@mui/material";
import React from "react";

interface CustomRatingProps {
  title: string;
  rating: number;
  handleSetRating: (value: number) => void;
}

const CustomRating: React.FC<CustomRatingProps> = ({
  title,
  rating,
  handleSetRating,
}) => {
  return (
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
  );
};

export default CustomRating;
