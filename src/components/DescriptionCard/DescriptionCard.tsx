import { CheckCircle } from "@mui/icons-material";
import { Avatar, Badge, Box, Rating, Typography } from "@mui/material";
import React from "react";

interface DescriptionCardProps {
  image?: string;
  title: string;
  description: string;
  rating?: number;
  isIdentificationVerified?: boolean;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  image,
  title,
  description,
  rating,
  isIdentificationVerified,
}) => {
  console.log(image);
  return (
    <Box
      sx={{
        padding: "20px",
        border: "1px solid #F58A47",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: image ? "center" : "",
        justifyContent: image ? "center" : "",
      }}
    >
      {image && (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            isIdentificationVerified ? <CheckCircle color="success" /> : <></>
          }
        >
          <Avatar
            sx={{
              width: "60px",
              height: "60px",
              alignSelf: "center",
            }}
            src={image}
          />
        </Badge>
      )}
      <Typography variant="h6">{title}</Typography>
      {rating && (
        <Rating size="small" name="read-only" value={rating} readOnly />
      )}
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export default DescriptionCard;
