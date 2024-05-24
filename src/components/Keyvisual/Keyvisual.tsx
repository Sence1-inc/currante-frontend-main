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
  const [subHeadingText, setsubHeadingText] = useState(`We provide reliable and trustworthy workers 
also rated by employers.`);
  const myTimer = (headingTextElem: object) => {
    headingTextElem.classList.toggle("mystyle");
    return null;  
  }
  useEffect(() => {
    const headingTextElem = document.querySelector(".headingText");
    setInterval(myTimer(headingTextElem), 2000);
  }, []);

  return (
    <Box sx={{pt: '50px', px: { md: "80px", sm: "20px"}, pb: '80px', 
      backgroundColor: "primary.light" }}>
      <Container
        sx={{
          py: 4,
          px: { lg: "0px", md: "20px" },
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: { md: 5, xs: 4 },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ order: {md: 1}, display: {sm: "block", md: "none"}, width: {md: "100%"} }}>
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
            width: { lg: "449px", sm: "100%"},
            height: 120.07,
            mb: 5 }}>
              <img className="keyvisual__img" src={LogoLarge} alt="" />
            </Box>
        </Box>
        <Box sx={{ order: { md: 2, xs: 2 }, width: { lg: "50%", md: "100%" }}}>
          <Box sx={{ display: {sm: "none", md: "block", lg: "block"} }}>
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
            width: { lg: "449px", sm: "100%"},
            height: 120.07,
            mb: 5,
            display: {xs: "none", sm: "none", md: "block", lg: "block"} }}>
              <img className="keyvisual__img" src={LogoLarge} alt="" />
            </Box>
          </Box>
          <Typography
            variant="h1"
            className="headingText" 
            sx={{
              textAlign: { md: "left", xs: "center" },
              color: "primary.main",
              whiteSpace: "pre-wrap",
              fontFamily: "Open Sans",
              fontSize: "22px",
              lineHeight: 1.5,
              mb: 4,
            }}
          >
            {headingText}
          </Typography>
          <Typography
            variant="h2"
            className="headingText" 
            sx={{
              textAlign: { md: "left", xs: "center" },
              // color: "primary.main",
              whiteSpace: "pre-wrap",
              fontFamily: "Open Sans",
              fontSize: "17.5px !important",
              color: "linear-gradient(135deg, rgba(255, 197, 129, 1) 10%, rgba(122, 231, 255, 1) 55%)",
              lineHeight: 1.5,
              mb: 4,
            }}
          >
            {subHeadingText}
          </Typography>
          <Box sx={{ textAlign: { md: "left", xs: "center" }, width: {md: "100%", sm: "100%", lg: "auto", xl: "auto"}}}>
            <PrimaryButton
              text="Learn More"
              handleClick={() => navigate("/services")}
            />
          </Box>
        </Box>
        <Box className="scroll-parent" sx={{ order: { md: 3, xs: 1 }, width: {lg: "50%", sm: "100%"}, overflowX: "scroll" }}>
        <Stack className="scroll-element primary" sx={{ width: "100vw", display: "flex", flexDirection: "row", alignItems: "flex-end"}}>
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
