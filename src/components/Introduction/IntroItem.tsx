import { Card, CardMedia, Typography } from "@mui/material";
import React from "react";

const IntroItem: React.FC<IntroItem> = ({ title, desc, image }) => {
  return (
    <Card
      sx={{
        margin: "auto",
        maxWidth: "calc((100% - 80px) / 3)",
        minWidth: "340px",
        padding: "20px",
        minHeight: "460px",
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
        height="240"
        image={image}
        sx={{ mb: 1 }}
      />
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 2,
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: "24px",
          color: "#d2580b",
          lineHeight: 1.25,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "Open Sans",
          fontSize: "16px",
        }}
      >
        {desc}
      </Typography>
    </Card>
  );
};

export default IntroItem;
