import { Card, CardMedia, Typography } from "@mui/material";
import React from "react";

const IntroItem: React.FC<IntroItem> = ({ title, desc, image }) => {
  return (
    <Card
      sx={{
        margin: "0",
        width: {xs: "100%", md: "calc((370/1200) * 100%)"},
        padding: "20px",
        minHeight: "400px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "row",
        boxShadow: "2px 4px rgba(245, 138, 71, 0.22)",
        backgroundColor: "#bcd2ff",
        flexWrap: "wrap",
      }}
    >
      <CardMedia
        component="img"
        alt=""
        height="auto"
        image={image}
        sx={{ objectFit: "contain", mb: "10px"}}
      />
      <Typography
        variant="h2"
        align="center"
        sx={{
          margin: "0 auto",
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: {xs: "18px", md: "16px", lg: "24px"},
          color: "#d2580b",
          lineHeight: 1.25,
          display: "flex",
          alignItems: "center",
          mb: "15px"
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "Open Sans",
          fontSize: {xs: "14px", md: "14px", lg: "16px"},
          fontWeight: "400"
        }}
      >
        {desc}
      </Typography>
    </Card>
  );
};

export default IntroItem;
