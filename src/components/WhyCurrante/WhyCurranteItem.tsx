import { Box, Typography } from "@mui/material";
import React from "react";
import { WhyCurranteItem as WhyCurranteItemProps } from "../../global";

const WhyCurranteItem: React.FC<WhyCurranteItemProps> = ({
  title,
  desc,
  image,
}) => {
  return (
    <Box
      sx={{
        maxWidth: {
          xs: "100%",
        },
        padding: { xs: "0px", sm: "20px" },
        minHeight: "157px",
        display: "flex",
        flexDirection: {
          xs: "column",
        },
        flexWrap: "nowrap",
        alignItems: {
          xs: "center",
        },
      }}
    >
      <Box
        component="img"
        alt=""
        src={image}
        sx={{ mb: 1, height: "104px", width: "120px" }}
      ></Box>
      <Box sx={{ mb: "0" }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            margin: "0 auto 15px",
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: { xs: "18px" },
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
            fontSize: { xs: "14px" },
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
