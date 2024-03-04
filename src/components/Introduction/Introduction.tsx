import React from "react";
import IntroItem from "./IntroItem";
import { Box, Container, Typography } from "@mui/material";

const Introduction: React.FC<IntroProps> = ({ introduction }) => {
  return (
    <Box component="section" id="introduction">
      <Container fixed>
        <Typography variant="h3">Introduction to Currante</Typography>
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
      </Container>
    </Box>
  );
};

export default Introduction;
