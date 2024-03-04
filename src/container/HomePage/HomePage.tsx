import React from "react";
import Newsletter from "../../components/Newsletter/Newsletter";
import { INTRODUCTION } from "../../data/IntroductionContent";
import Introduction from "../../components/Introduction/Introduction";
import { Box } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box>
      <Introduction introduction={INTRODUCTION} />
      <Newsletter />
    </Box>
  );
};

export default HomePage;
