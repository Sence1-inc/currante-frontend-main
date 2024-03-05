import { Box, Container, Typography } from "@mui/material";
import BannerImage from "../../assets/banner.png";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import "./Keyvisual.css";

const Keyvisual: React.FC = () => {
  return (
    <Box sx={{ py: 1, px: { md: 0, xs: 3 }, backgroundColor: "primary.light" }}>
      <Container
        sx={{
          py: 4,
          px: 0,
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: { md: "auto", xs: 4 },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ order: { md: 1, xs: 2 } }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: { md: "left", xs: "center" },
              color: "primary.dark",
              mb: 2,
            }}
          >
            Your Ultimate Home Maintenance Solution
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textAlign: { md: "left", xs: "center" },
              color: "primary.main",
              mb: 2,
            }}
          >
            Hire at Currante
          </Typography>
          <Box sx={{ textAlign: { md: "left", xs: "center" } }}>
            <PrimaryButton text="Get Started" />
          </Box>
        </Box>
        <Box sx={{ order: { md: 2, xs: 1 }, width: "auto" }}>
          <img className="keyvisual__img" src={BannerImage} alt="" />
        </Box>
      </Container>
    </Box>
  );
};

export default Keyvisual;
