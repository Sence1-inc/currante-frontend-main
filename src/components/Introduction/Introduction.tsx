import { Box, Container, Typography } from "@mui/material";
import React from "react";
import IntroItem from "./IntroItem";

const Introduction: React.FC<IntroProps> = ({ introduction }) => {
  return (
    <Box
      sx={{
        padding: { xs: "62px 0", md: "62px 97px" },
        width: "100%",
        backgroundColor: "#d8e5ff",
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: "48px",
            color: "#0e2f71",
            marginBottom: "75px",
          }}
        >
          Introduction to Currante
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
          {introduction.map((introItem: IntroItem, index: number) => {
            return (
              <IntroItem
                key={index}
                title={introItem.title}
                desc={introItem.desc}
                image={introItem.image}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Introduction;
