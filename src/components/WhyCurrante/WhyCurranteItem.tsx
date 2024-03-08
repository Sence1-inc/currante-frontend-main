import { Box, Typography } from "@mui/material";
import React from "react";

const WhyCurranteItem: React.FC<WhyCurranteItem> = ({ title, desc, image }) => {
  return (
    <Box
      sx={{
        maxWidth: {
          xs: "100%",
          md: "468px",
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
            fontSize: "24px",
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
            fontSize: "16px",
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
