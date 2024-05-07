import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  Link as MuiLink,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch } from "../../redux/store";
import authPageStyles from "../../styles/authPageStyles";

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  const dispatch = useAppDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  function handleEmail(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      email: inputValue,
    }));
  }

  function handlePassword(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password: inputValue,
    }));
  }

  const handleSignIn = async (role: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(userCredentials.email);
    const isPasswordValid = undefined;

    if (!isValidEmail && !isPasswordValid) {
      setOpen(true);
    } else {
      try {
        const data = {
          email: userCredentials.email,
          password: userCredentials.password,
          service_id: Number(import.meta.env.VITE_SERVICE_ID),
          service_key: import.meta.env.VITE_SERVICE_KEY,
          role: role,
        };

        const response = await axiosInstance.post("/api/v1/login", data);
        if (response.data.user) {
          dispatch(initializeUser(response.data.user));

          if (response.data.user.logged_in_as === "worker") {
            navigate("/jobs");
          } else if (response.data.user.logged_in_as === "employer") {
            navigate("/services");
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.log("Error logging in: ", error);
      }
    }
  };

  const handleClose = (_event: React.SyntheticEvent | Event) => {
    setOpen(false);
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
          <Typography sx={authPageStyles.form.heading}>Sign-in</Typography>
          <Snackbar
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Password and email Incorrect"
            action={action}
            sx={{ marginTop: "60px" }}
          />
          <TextField
            onChange={(e) => handleEmail(e.target.value)}
            value={userCredentials.email}
            type="email"
            id="email"
            label="Email Address"
            placeholder="Enter Your Email Address"
            sx={authPageStyles.form.formInput}
            InputProps={{
              sx: authPageStyles.form.formInputProp,
            }}
            InputLabelProps={{
              sx: authPageStyles.form.formInputLabel,
              shrink: true,
            }}
          />
          <TextField
            onChange={(e) => handlePassword(e.target.value)}
            value={userCredentials.password}
            type="password"
            id="Password"
            label="Password"
            placeholder="Enter Your Password"
            sx={authPageStyles.form.formInput}
            InputProps={{
              sx: authPageStyles.form.formInputProp,
            }}
            InputLabelProps={{
              sx: authPageStyles.form.formInputLabel,
              shrink: true,
            }}
          />
          <Box sx={authPageStyles.container.buttonsContainer}>
            <Button
              onClick={() => handleSignIn("worker")}
              variant="contained"
              color="primary"
              sx={authPageStyles.form.formButton}
            >
              Sign In as Worker
            </Button>
            <Button
              onClick={() => handleSignIn("employer")}
              variant="contained"
              color="primary"
              sx={authPageStyles.form.formButton}
            >
              Sign In as Client
            </Button>
          </Box>
          <MuiLink
            underline="none"
            to="/forgot-password"
            component={RouterLink}
            sx={authPageStyles.form.formLink}
          >
            Forgot password?
          </MuiLink>
          <Box
            sx={[
              authPageStyles.container.buttonsContainer,
              { gap: "5px", marginTop: "50px" },
            ]}
          >
            <Typography sx={authPageStyles.form.formSimpleText}>
              Don’t have an account?
            </Typography>
            <MuiLink
              component={RouterLink}
              to="/sign-up"
              underline="none"
              variant="body1"
              sx={authPageStyles.form.formSignUpLink}
            >
              Sign Up
            </MuiLink>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SignInPage;
