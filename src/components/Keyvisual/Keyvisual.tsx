import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import{ useState, useEffect } from "react";
import LogoLarge from "../../assets/currante-logo-key-visual.png";
import HomeMaintenanceImg from "../../assets/home-maintenance.png";
import PlumbingImg from "../../assets/plumbing-services.png";
import FixturesImg from "../../assets/fixtures-and-installation-services.png";
import LeakRepairImg from "../../assets/leak-and-pipe-replacement-services.png";
import CarpentryImg from "../../assets/carpentry-services.png";
import DeepCleaningImg from "../../assets/cleaning-services.png";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import Stack from '@mui/material/Stack';
import "./Keyvisual.css";

const Keyvisual: React.FC = () => {
  const navigate = useNavigate();
  const [headingText, setHeadingText] = useState(`All-in-one solution for home repairs and maintenance. 
Seek laborers for cleaning, carpentry, and plumbing services.`);
  const myTimer = (headingTextElem: object) => {
    headingTextElem.classList.toggle("mystyle");
    return null;
  }
  useEffect(() => {
    const headingTextElem = document.querySelector(".headingText");
    setInterval(myTimer(headingTextElem), 2000);
  }, []);

  return (
    <Box sx={{pt: "50px", px: { md: "80px", xs: 3 }, pb: "80px", 
      backgroundColor: "primary.light" }}>
      <Container
        sx={{
          py: 4,
          px: 0,
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: { md: 5, xs: 4 },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ order: { md: 1, xs: 2 }, width: "50%" }}>
          <Typography
            sx={{
              textAlign: { md: "left", xs: "center" },
              color: "primary.main",
              fontWeight: 600,
              fontStyle: "italic",
              mb: 2,
            }}
          >
            Need a carpenter, cleaner, and plumber but with no leads?
          </Typography>
          <Box sx={{ 
          width: 449,
          height: 120.07,
          mb: 5 }}>
            <img className="keyvisual__img" src={LogoLarge} alt="" />
          </Box>
          <Typography
            variant="h1"
            className="headingText" 
            sx={{
              textAlign: { md: "left", xs: "center" },
              color: "primary.main",
              whiteSpace: "pre-wrap",
              fontFamily: "Open Sans",
              fontSize: "27px",
              lineHeight: 1.5,
              mb: 4,
            }}
          >
            {headingText}
          </Typography>
          <Box sx={{ textAlign: { md: "left", xs: "center" } }}>
            <PrimaryButton
              text="Learn More"
              handleClick={() => navigate("/services")}
            />
          </Box>
        </Box>
        <Box className="scroll-parent" sx={{ order: { md: 2, xs: 1 }, width: "50%" }}>
        <Stack className="scroll-element primary" sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", overflowX: "scroll"}}>
          <Box component="img" sx={{ maxWidth: "338px"}} src={HomeMaintenanceImg}></Box>
          <Box component="img" sx={{ maxWidth: "315px"}} src={PlumbingImg}></Box>
          <Box component="img" sx={{ maxWidth: "315px"}} src={FixturesImg}></Box> 
          <Box component="img" sx={{ maxWidth: "295px"}} src={LeakRepairImg}></Box>  
          <Box component="img" sx={{ maxWidth: "315px"}} src={CarpentryImg}></Box>  
          <Box component="img" sx={{ maxWidth: "295px"}} src={DeepCleaningImg}></Box>  
        </Stack>
      
        </Box>
      </Container>
    </Box>
  );
};

export default Keyvisual;
