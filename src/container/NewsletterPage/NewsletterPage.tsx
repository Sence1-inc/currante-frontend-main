import { Box } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Newsletter from "../../components/Newsletter/Newsletter";

const NewsletterPage = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#F5F6FA",
          height: "calc(100vh - 64px - 84px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Newsletter />
      </Box>
      <Footer />
    </Box>
  );
};

export default NewsletterPage;
