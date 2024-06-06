import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import { Fragment, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import authPageStyles from "../../styles/authPageStyles";

interface SignUpVerifyPageProps {}

const SignUpVerifyPage: React.FC<SignUpVerifyPageProps> = () => {
  const [snackBarState, setSnackBarState] = useState({
    state: false,
    snackBarMessage: "",
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = snackBarState;

  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmitVerifyCode = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/verify/${token}`);
      if (response.status === 201) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log("Error verifying:", error);
    }
  };

  const handleClose = (_event: React.SyntheticEvent | Event) => {
    setSnackBarState((prevState) => ({
      ...prevState,
      state: false,
    }));
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box sx={authPageStyles.container.mainContainer}>
        <Box sx={authPageStyles.container.innerContainer}>
          <Typography sx={authPageStyles.form.heading}>Verify Email</Typography>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarState.state}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackBarState.snackBarMessage}
            action={action}
            key={vertical + horizontal}
            sx={{ marginTop: "60px" }}
          />
          <Box
            sx={[
              authPageStyles.container.buttonsContainer,
              { gap: "5px", marginTop: "20px" },
            ]}
          >
            <Typography
              variant="body1"
              color="primary"
              sx={{ textAlign: "center" }}
            >
              Thank you for signing up! To ensure the security of your account
              and complete the registration process, please click Verify button
              below to verify your email address. If error persists, contact
              currante@sence1.com.
            </Typography>
          </Box>

          <Box sx={authPageStyles.container.buttonsContainer}>
            <Button
              onClick={handleSubmitVerifyCode}
              variant="contained"
              color="primary"
              sx={authPageStyles.form.formButton}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SignUpVerifyPage;
