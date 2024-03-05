import { Box } from "@mui/material";
import React from "react";
import FAQ from "../../components/FAQ/FAQ";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Introduction from "../../components/Introduction/Introduction";
import Newsletter from "../../components/Newsletter/Newsletter";
import WhyCurrante from "../../components/WhyCurrante/WhyCurrante";
import { INTRODUCTION } from "../../data/IntroductionContent";
import { WHYCURRANTE } from "../../data/WhyCurranteContent";

import Keyvisual from "../../components/Keyvisual/Keyvisual";

const HomePage: React.FC = () => {
  return (
    <Box>
      <Header />
      <Keyvisual />
      <Newsletter />
      <Introduction introduction={INTRODUCTION} />
      <WhyCurrante whyCurrante={WHYCURRANTE} />
      <Newsletter />
      <FAQ />
      <Footer />
    </Box>
  );
};

export default HomePage;
