import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import CheckImage from "../../assets/check.png";
import CustomModal from "../../components/Tabs/Modal";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <CustomModal isModalOpen={true} handleCloseModal={() => navigate("/jobs")}>
      <Box
        sx={{
          padding: "24px",
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <img src={CheckImage} alt="" />
        </Box>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: "#1A1B21",
            textAlign: "center",
            fontFamily: "Poppins",
            marginBottom: "10px",
          }}
        >
          Your payment was successful.
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Your job order has been booked. Please wait for the worker to confirm.
          Thank you!
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "24px",
          }}
        >
          <Button
            variant="contained"
            sx={{ widht: "auto" }}
            onClick={() => navigate("/jobs")}
          >
            See Jobs
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default PaymentSuccessPage;
