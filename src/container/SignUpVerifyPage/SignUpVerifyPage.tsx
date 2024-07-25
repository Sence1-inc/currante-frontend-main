import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import { Fragment, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
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
  const [isVerificationLinkInvalid, setIsVerificationLinkInvalid] =
    useState<boolean>(false);
  const [isVerificationLinkExpired, setIsVerificationLinkExpired] =
    useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [isNewLinkSent, setIsNewLinkSent] = useState<boolean>(false);

  const { vertical, horizontal } = snackBarState;

  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmitVerifyCode = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/verify/${token}`);
      if (response.status === 201) {
        setIsVerificationLinkInvalid(false);
        navigate("/sign-in");
      }
    } catch (error: any) {
      setIsSnackbarOpen(true);
      setSuccessMessage("");
      setInfoMessage("");
      if (error.response.status === 409) {
        setInfoMessage(error.response.data.message);
        setIsVerificationLinkInvalid(true);
      } else if (error.response.status === 410) {
        setInfoMessage("Verification link has expired");
        setIsVerificationLinkExpired(true);
      } else {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const handleRequestNewLink = async () => {
    try {
      const response = await axiosInstance.post(`/api/v1/resend/${token}`);
      if (response.status === 201) {
        setIsSnackbarOpen(true);
        setIsVerificationLinkInvalid(false);
        setIsVerificationLinkExpired(false);
        setIsNewLinkSent(true);
        setSuccessMessage(response.data.message);
        setInfoMessage("");
        setErrorMessage("");
      }
    } catch (error: any) {
      setIsSnackbarOpen(true);
      setErrorMessage(error.response.data.message ?? "An error occured");
      setSuccessMessage("");
      setInfoMessage("");
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
        <CustomSnackbar
          errorMessage={errorMessage}
          infoMessage={infoMessage}
          successMessage={successMessage}
          isSnackbarOpen={isSnackbarOpen}
          handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
        />
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
            {!isNewLinkSent ? (
              <Typography
                variant="body1"
                color="primary"
                sx={{ textAlign: "center" }}
              >
                Thank you for signing up! To ensure the security of your account
                and complete the registration process, please click Verify
                button below to verify your email address. If error persists,
                contact currante@sence1.com.
              </Typography>
            ) : (
              <Typography
                variant="body1"
                color="primary"
                sx={{ textAlign: "center" }}
              >
                New verification link has been sent. Please check your email.
              </Typography>
            )}
          </Box>

          {!isNewLinkSent && (
            <Box sx={authPageStyles.container.buttonsContainer}>
              {!isVerificationLinkInvalid && !isVerificationLinkExpired ? (
                <Button
                  onClick={handleSubmitVerifyCode}
                  variant="contained"
                  color="primary"
                  sx={authPageStyles.form.formButton}
                >
                  Verify
                </Button>
              ) : isVerificationLinkInvalid ? (
                <Button
                  onClick={() => navigate("/sign-in")}
                  variant="contained"
                  color="primary"
                  sx={authPageStyles.form.formButton}
                >
                  Sign-in
                </Button>
              ) : (
                <Button
                  onClick={handleRequestNewLink}
                  variant="contained"
                  color="primary"
                  sx={authPageStyles.form.formButton}
                >
                  Request new link
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SignUpVerifyPage;
