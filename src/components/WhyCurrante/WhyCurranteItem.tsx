import { Box, Typography } from "@mui/material";
import React from "react";

const WhyCurranteItem: React.FC<WhyCurranteItem> = ({ title, desc, image }) => {
  return (
    <Box
      sx={{
        maxWidth: {
          xs: "100%",
          md: "37%"
        },
        padding: "20px",
        minHeight: "157px",
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        flexWrap: "nowrap",
        alignItems: {
          xs: "center",
          lg: "unset",
        },
      }}
    >
      <Box
        component="img"
        alt=""
        src={image}
        sx={{ mb: 1, height: "104px", width: "120px" }}
      ></Box>
      <Box>
        <Typography
          variant="h2"
          align="center"
          sx={{
            margin: "0 auto 15px",
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: {xs: "18px", md: "18px", lg: "24px"},
            color: "#F58A47",
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Open Sans",
            fontSize: {xs: "14px", md: "14px", lg: "16px"},
            fontWeight: 400,
            color: "#000000",
            textAlign: "center",
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};

export default WhyCurranteItem;
