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
import { AutoAwesomeMosaicOutlined } from "@mui/icons-material";

const Keyvisual: React.FC = () => {
  const navigate = useNavigate();
  const [headingText, setHeadingText] = useState(`All-in-one solution for home repairs and maintenance. 
Seek laborers for cleaning, carpentry, and plumbing services.`);
  const [subHeadingText, setsubHeadingText] = useState(`We provide reliable and trustworthy workers also rated by short-time clients.`);
  const [counter, setCounter] = useState(0);
  const [topText, setTopText] = useState(`Need a carpenter, cleaner, and plumber but with no leads?`);


  useEffect(() => {
    const interval = setTimeout(() => {
      setCounter(counter + 1);
      console.log(`counter: ` + counter)
      if(counter % 5 == 0) {
        if(topText === `Need a carpenter, cleaner, and plumber but with no leads?`) {
          setTopText(`Join Currante to connect with short-term clients`);
          setHeadingText(`Looking for a short part-time job as a maid, carpenter, or plumber?`);
        } else {
          console.log(`changed`);
          setTopText(`Need a carpenter, cleaner, and plumber but with no leads?`);
          setHeadingText(`All-in-one solution for home repairs and maintenance. Seek laborers for cleaning, carpentry, and plumbing services.`)
        }
      }
    }, 1000);
      return () => {
        clearInterval(interval);
      }
    }, [counter]);

  const notDivBy5 = () => {
    console.log(`NOT DIV by 5: ` + counter);
  }
  const isCounterDivBy5 = () => {
    if(counter % 5 == 0) {
      return ` slide-down`;
    } else {
      console.log(`not yet divisible by 5`);
      return ``;
    }
  }


  return (
    <Box sx={{pt: '50px', px: { lg: "80px", md: "40px", xs: "20px"}, pb: '80px', 
      backgroundColor: "primary.light" }}>
      <Container
        sx={{
          py: 4,
          px: "0px !important",
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: { md: 5, xs: 4 },
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box sx={{ order: {md: 1}, display: {sm: "block", md: "none"}, width: {md: "100%"} }}>
          <Box id="Slider" className={`slide-up` + isCounterDivBy5()} >
            <Box>
              <Typography
                  sx={{
                    textAlign: { md: "left", xs: "center" },
                    color: "primary.main",
                    fontWeight: 600,
                    fontStyle: "italic",
                    mb: {xs: 2, sm: 2, md: "40px", lg: "40px", xl: "32px"},
                    //display: {xs: "block", lg: "none"}
                  }}
                >
                  {topText}             
                </Typography>
            </Box>
          </Box>

            <Box sx={{ 
            width: { lg: "449px", sm: "100%"},
            maxWidth: {md: "455px"},
            minWidth: {sm: "auto", md: "400px", lg: "auto"},
            mb: { xs: 0, sm: 0, md: 0, lg: 3, xl: "32px"} }}>
              <img className="keyvisual__img" src={LogoLarge} alt="" />
            </Box>
        </Box>
        <Box sx={{ 
          order: { md: 2, xs: 2 }, 
          width: {md: "100% ", lg: "50%"},
          minWidth: {md: "50vw", lg: "auto"}
          }}>
          <Box sx={{ display: {sm: "none", md: "block", lg: "block"} }}>
            <Box id="Slider" className={`slide-up` + isCounterDivBy5()} >
              <Box>
                <Typography
                  sx={{
                    textAlign: { md: "left", xs: "center" },
                    color: "primary.main",
                    fontWeight: 600,
                    fontStyle: "italic",
                    mb: 2,
                    display: {xs: "none", md: "block", lg: "block"}
                  }}
                >
                  {topText}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ 
            width: { lg: "449px", sm: "100%"},
            mb: { xs: 0, sm: 0, md: 0, lg: 3, xl: "32px"},
            display: {xs: "none", sm: "none", md: "block", lg: "block"} }}>
              <img className="keyvisual__img" src={LogoLarge} alt="" />
            </Box>
          </Box>
          <Typography
            variant="h1"
            className="headingText"
            sx={{
              textAlign: { md: "left", xs: "center" },
              color: "#263f7f",
              whiteSpace: "pre-wrap",
              fontFamily: "Open Sans",
              fontSize: {xs: "20px", md: "23px", lg: "25px"},
              fontWeight: "700",
              lineHeight: 1.5,
              height: {md: "12vh", lg: "20vh"},
              display: "flex",
              alignItems: "center",
              mt: {md: "50px", lg: "30px"},
              mb: {md: "50px", lg: "30px"}
            }}
          >
           <Box id="Slider" className={`slide-up` + isCounterDivBy5()} >
              <Box>
                {headingText}
              </Box>
           </Box>
          </Typography>
          <Typography
            variant="h2"
            className="headingText" 
            sx={{
              textAlign: { md: "left", xs: "center" },
              // color: "primary.main",
              whiteSpace: "pre-wrap",
              fontFamily: "Open Sans",
              fontWeight: "650",
              fontSize: "17.5px !important",
              color: "#335393",
              lineHeight: 1.5,
              mb: "17px",
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
        <Box className="kv-track wrapper" sx={{ order: { md: 3, xs: 1 }, width: {lg: "50%", sm: "100%"}, overflowX: "scroll"}}>
        <Stack className="track primary" sx={{ width: "100vw", display: "flex", flexDirection: "row", alignItems: "flex-end"}}>
          <Box component="img" sx={{ maxWidth: "338px"}} src={HomeMaintenanceImg}></Box>
          <Box component="img" sx={{ maxWidth: "315px"}} src={PlumbingImg}></Box>
          <Box component="img" sx={{ maxWidth: "315px"}} src={FixturesImg}></Box> 
          <Box component="img" sx={{ maxWidth: "295px"}} src={LeakRepairImg}></Box>  
          <Box component="img" sx={{ maxWidth: "315px"}} src={CarpentryImg}></Box>  
          <Box component="img" sx={{ maxWidth: "295px"}} src={DeepCleaningImg}></Box>  
          <Box component="img" sx={{ maxWidth: "338px"}} src={HomeMaintenanceImg}></Box>
          <Box component="img" sx={{ maxWidth: "315px"}} src={PlumbingImg}></Box>
          <Box component="img" sx={{ maxWidth: "315px"}} src={FixturesImg}></Box> 
          <Box component="img" sx={{ maxWidth: "295px"}} src={LeakRepairImg}></Box>  
          <Box component="img" sx={{ maxWidth: "315px"}} src={CarpentryImg}></Box>  
          <Box component="img" sx={{ maxWidth: "295px"}} src={DeepCleaningImg}></Box>  
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

