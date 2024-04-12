import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

interface DescriptionCardProps {
  image?: string;
  title: string;
  description: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <Box
      sx={{
        padding: "10px 20px",
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
        <Avatar
          sx={{
            width: "60px",
            height: "60px",
            alignSelf: "center",
          }}
          src={image}
        />
      )}
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export default DescriptionCard;
