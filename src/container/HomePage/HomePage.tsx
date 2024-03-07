import { Box } from "@mui/material";
import React from "react";
import FAQ from "../../components/FAQ/FAQ";
import Introduction from "../../components/Introduction/Introduction";
import Newsletter from "../../components/Newsletter/Newsletter";
import WhyCurrante from "../../components/WhyCurrante/WhyCurrante";
import { INTRODUCTION } from "../../data/IntroductionContent";
import { WHYCURRANTE } from "../../data/WhyCurranteContent";

const HomePage: React.FC = () => {
  return (
    <Box>
      <Introduction introduction={INTRODUCTION} />
      <WhyCurrante whyCurrante={WHYCURRANTE} />
      <Newsletter />
      <FAQ />
    </Box>
  );
};

export default HomePage;
