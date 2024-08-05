import { Box, Button, Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CarpentryImg from "../../assets/carpentry-services.png";
import DeepCleaningImg from "../../assets/cleaning-services.png";
import LogoLarge from "../../assets/currante-logo-key-visual.png";
import FixturesImg from "../../assets/fixtures-and-installation-services.png";
import HomeMaintenanceImg from "../../assets/home-maintenance.png";
import LeakRepairImg from "../../assets/leak-and-pipe-replacement-services.png";
import PlumbingImg from "../../assets/plumbing-services.png";
import { useAppSelector } from "../../redux/store";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import "./Keyvisual.css";

const Keyvisual: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  const [headingText, setHeadingText] =
    useState(`All-in-one solution for home repairs and maintenance. 
Seek laborers for cleaning, carpentry, and plumbing services.`);
  const [counter, setCounter] = useState(0);
  const [topText, setTopText] = useState(
    `Need a carpenter, cleaner, and plumber but with no leads?`
  );

  useEffect(() => {
    const interval = setTimeout(() => {
      setCounter(counter + 1);
      if (counter % 5 == 0) {
        if (
          topText ===
          `Need a carpenter, cleaner, and plumber but with no leads?`
        ) {
          setTopText(`Join Currante to connect with short-term clients`);
          setHeadingText(
            `Looking for a short part-time job as a maid, carpenter, or plumber?`
          );
        } else {
          setTopText(
            `Need a carpenter, cleaner, and plumber but with no leads?`
          );
          setHeadingText(
            `All-in-one solution for home repairs and maintenance. Seek laborers for cleaning, carpentry, and plumbing services.`
          );
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  const isCounterDivBy5 = () => {
    if (counter % 5 == 0) {
      return ` slide-down`;
    } else {
      return ``;
    }
  };

  return (
    <Box
      sx={{
        pt: { xs: "40px", sm: "50px" },
        px: { xs: "20px" },
        pb: "80px",
        backgroundColor: "primary.light",
      }}
    >
      <Container
        sx={{
          py: 4,
          px: "0px !important",
          display: "flex",
          flexDirection: { xs: "column" },
          gap: { xs: 4 },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            // order: { md: 1 },
            display: { sm: "block" },
            width: { xs: "100%" },
          }}
        >
          <Box id="Slider" className={`slide-up` + isCounterDivBy5()}>
            <Box>
              <Typography
                sx={{
                  textAlign: { xs: "center" },
                  color: "primary.main",
                  fontWeight: 600,
                  fontStyle: "italic",
                  fontSize: "18.5px !important",
                  mb: { xs: 2 },
                  //display: {xs: "block", lg: "none"}
                }}
              >
                {topText}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: { sm: "100%" },
              // maxWidth: { md: "455px" },
              // minWidth: { sm: "auto", md: "400px", lg: "auto" },
              mb: { xs: 0 },
            }}
          >
            <img className="keyvisual__img" src={LogoLarge} alt="" />
          </Box>
        </Box>
        <Box
          sx={{
            order: { xs: 2 },
          }}
        >
          <Typography
            variant="h1"
            className="headingText"
            sx={{
              textAlign: { xs: "center" },
              color: "#263f7f",
              whiteSpace: "pre-wrap",
              fontFamily: "Open Sans",
              fontSize: { xs: "24px" },
              fontWeight: "700",
              lineHeight: 1.5,
              height: { xs: "20vh" },
              mt: "20px",
              mb: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box id="Slider" className={`slide-up` + isCounterDivBy5()}>
              <Box>{headingText}</Box>
            </Box>
          </Typography>
          <Typography
            variant="h2"
            className="headingText"
            sx={{
              textAlign: { xs: "center" },
              whiteSpace: "pre-wrap",
              fontFamily: "Open Sans",
              fontWeight: "650",
              fontSize: "17.5px !important",
              color: "#335393",
              lineHeight: 1.5,
              mb: { xs: "30px" },
            }}
          >
            {`We provide reliable and trustworthy workers also rated by short-time clients.`}
          </Typography>
          <Box
            sx={{
              textAlign: { xs: "center" },
              display: "flex",
              flexDirection: { xs: "column" },
              gap: "20px",
              alignItems: "center",
              justifyContent: { xs: "center" },
            }}
          >
            <PrimaryButton
              text="Start hiring"
              handleClick={() => navigate("/services")}
            />
            {!isAuthenticated && (
              <Button
                sx={{
                  py: 2,
                  px: 6,
                  borderRadius: 4,
                  backgroundColor: "primary.main",
                  color: "common.white",
                  variant: "h6",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                }}
                onClick={() => navigate("/sign-in")}
              >
                Have an account?
              </Button>
            )}
          </Box>
        </Box>
        <Box
          className="kv-track wrapper"
          sx={{
            order: { xs: 1 },
            width: { sm: "100%" },
            overflowX: "scroll",
          }}
        >
          <Stack
            className="track primary"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Box
              component="img"
              sx={{ maxWidth: "338px" }}
              src={HomeMaintenanceImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "315px" }}
              src={PlumbingImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "315px" }}
              src={FixturesImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "295px" }}
              src={LeakRepairImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "315px" }}
              src={CarpentryImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "295px" }}
              src={DeepCleaningImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "338px" }}
              src={HomeMaintenanceImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "315px" }}
              src={PlumbingImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "315px" }}
              src={FixturesImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "295px" }}
              src={LeakRepairImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "315px" }}
              src={CarpentryImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "295px" }}
              src={DeepCleaningImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "338px" }}
              src={HomeMaintenanceImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "315px" }}
              src={PlumbingImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "315px" }}
              src={FixturesImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "295px" }}
              src={LeakRepairImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "315px" }}
              src={CarpentryImg}
            ></Box>
            <Box
              component="img"
              sx={{ maxWidth: "295px" }}
              src={DeepCleaningImg}
            ></Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Keyvisual;
