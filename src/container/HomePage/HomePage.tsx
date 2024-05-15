import EmailIcon from "@mui/icons-material/Email";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import React, { useState } from "react";
import ExploreOurServices from "../../components/ExploreOurServices/ExploreOurServices";
import FabButton from "../../components/FabButton/FabButton";
import FAQ from "../../components/FAQ/FAQ";
import FloatingElement from "../../components/FloatingElement/FloatingElement";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Introduction from "../../components/Introduction/Introduction";
import Keyvisual from "../../components/Keyvisual/Keyvisual";
import Newsletter from "../../components/Newsletter/Newsletter";
import WhyCurrante from "../../components/WhyCurrante/WhyCurrante";
import { INTRODUCTION } from "../../data/IntroductionContent";
import { WHYCURRANTE } from "../../data/WhyCurranteContent";

const jump = keyframes({
  "0%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-10px)" },
  "100%": { transform: "translateY(0)" },
});

const HomePage: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Keyvisual />
      <FloatingElement anchorEl={anchorEl} handleClose={handleClose}>
        <Newsletter />
      </FloatingElement>
      <WhyCurrante whyCurrante={WHYCURRANTE} />
      <Introduction introduction={INTRODUCTION} />
      <ExploreOurServices />
      <FAQ />
      <Footer />
      <FabButton
        icon={
          <EmailIcon
            sx={{ mr: 1, animation: `${jump} 0.5s ease-in-out infinite` }}
          />
        }
        text="Subscribe to our Newsletter"
        handleClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
      />
    </Box>
  );
};

export default HomePage;
