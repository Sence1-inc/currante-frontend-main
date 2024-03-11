import { Box } from "@mui/material";
import React from "react";
import ExploreOurServices from "../../components/ExploreOurServices/ExploreOurServices";
import FAQ from "../../components/FAQ/FAQ";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Introduction from "../../components/Introduction/Introduction";
import Keyvisual from "../../components/Keyvisual/Keyvisual";
import Newsletter from "../../components/Newsletter/Newsletter";
import WhyCurrante from "../../components/WhyCurrante/WhyCurrante";
import { INTRODUCTION } from "../../data/IntroductionContent";
import { WHYCURRANTE } from "../../data/WhyCurranteContent";

const HomePage: React.FC = () => {
  return (
    <Box>
      <Header />
      <Keyvisual />
      <Newsletter />
      <Introduction introduction={INTRODUCTION} />
      <WhyCurrante whyCurrante={WHYCURRANTE} />
      <Newsletter />
      <ExploreOurServices />
      <FAQ />
      <Footer />
    </Box>
  );
};

export default HomePage;
