import { Box, Card, CardMedia, Typography } from "@mui/material";
import React from "react";
import { IntroItem as IntroItemProps } from "../../global";

const IntroItem: React.FC<IntroItemProps> = ({ title, desc, image }) => {
  return (
    <Card
      sx={{
        margin: "0",
        width: {xs: "100%", md: "calc((420/1200) * 100%)", lg: "calc((300/1200) * 100%)"},
        padding: "20px",
        height: "auto",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "row",
        boxShadow: "2px 4px rgba(245, 138, 71, 0.22)",
        backgroundColor: "#bcd2ff",
        flexWrap: "wrap",
        alignItems: "flex-start"
      }}
    >
      <Box
       sx={{ 
        display: "flex",
        justifyContent: "center",
        width: "100%"}}>
        <CardMedia
          component="img"
          alt=""
          image={image}
          sx={{ objectFit: "contain", maxHeight: "280px"}}
        />
      </Box>
      <Typography
        variant="h2"
        align="center"
        sx={{
          margin: "0 auto",
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: {xs: "18px", md: "16px", lg: "21px"},
          color: "#d2580b",
          lineHeight: 1.25,
          display: "flex",
          alignItems: "center",
          mb: "14px"
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
