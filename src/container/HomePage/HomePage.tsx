import { Box } from "@mui/material";
import React from "react";
import FAQ from "../../components/FAQ/FAQ";
import Introduction from "../../components/Introduction/Introduction";
import Newsletter from "../../components/Newsletter/Newsletter";
import { INTRODUCTION } from "../../data/IntroductionContent";

const HomePage: React.FC = () => {
  return (
    <Box>
      <Introduction introduction={INTRODUCTION} />
      <Newsletter />
      <FAQ />
    </Box>
  );
};

export default HomePage;
