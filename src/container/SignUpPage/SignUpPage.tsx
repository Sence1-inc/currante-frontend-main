import { addDoc, collection } from "@firebase/firestore";
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
import { Link as RouterLink } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { db } from "../../firebase";
import authPageStyles from "../../styles/authPageStyles";

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    middle_name: "",
  });

  const [snackBarState, setSnackBarState] = useState({
    state: false,
    snackBarMessage: "",
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = snackBarState;

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

  function handlePassword2(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password2: inputValue,
    }));
  }

  const handleSignUp = async (role: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(userCredentials.email);
    const isPasswordValid = userCredentials.password.length > 6;
    const isPassword2 = userCredentials.password === userCredentials.password2;

    if (!isValidEmail || !userCredentials.email) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: "Please provide a valid email address.",
      }));
    } else if (!isPasswordValid) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: "Please provide a valid password.",
      }));
    } else if (!isPassword2) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: "Password does not match.",
      }));
    } else {
      const data = {
        first_name: userCredentials.first_name,
        last_name: userCredentials.last_name,
        middle_name: userCredentials.middle_name,
        email: userCredentials.email,
        password: userCredentials.password,
        service_id: Number(import.meta.env.VITE_SERVICE_ID),
        service_key: import.meta.env.VITE_SERVICE_KEY,
        role: role,
      };

      try {
        const response = await axiosInstance.post("/api/v1/register", data);
        if (response.data) {
          const userRef = collection(db, "users");
          console.log(response.data);
          const docRef = await addDoc(userRef, {
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            middle_name: response.data.user.middle_name,
            user_id: response.data.user.id,
            uuid: response.data.user.uuid,
          });

          console.log(docRef.id);

          setSnackBarState((prevState) => ({
            ...prevState,
            state: true,
            snackBarMessage:
              "Verification email has been sent. Please verify email before logging in.",
          }));
        }
      } catch (error) {
        console.log("Registration error: ", error);
      }
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
          <Typography sx={authPageStyles.form.heading}>Sign-up</Typography>
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
          <TextField
            onChange={(e) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                first_name: e.target.value,
              }))
            }
            type="text"
            id="text"
            label="First name"
            placeholder="Enter Your First Name"
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
            onChange={(e) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                middle_name: e.target.value,
              }))
            }
            type="text"
            id="text"
            label="Middle name"
            placeholder="Enter Your Middle Name"
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
            onChange={(e) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                last_name: e.target.value,
              }))
            }
            type="text"
            id="text"
            label="Last name"
            placeholder="Enter Your Last Name"
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
            onChange={(e) => handleEmail(e.target.value)}
            type="email"
            id="email"
            label="Email address"
            placeholder="Enter Your Preferred Email Address"
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
            type="password"
            id="password"
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
          <TextField
            onChange={(e) => handlePassword2(e.target.value)}
            type="password"
            id="password2"
            label="Confirm Password"
            placeholder="Reenter Your Password"
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
              onClick={() => handleSignUp("worker")}
              variant="contained"
              color="primary"
              sx={authPageStyles.form.formButton}
            >
              Sign Up as Worker
            </Button>
            <Button
              onClick={() => handleSignUp("employer")}
              variant="contained"
              color="primary"
              sx={authPageStyles.form.formButton}
            >
              Sign Up as Client
            </Button>
          </Box>
        </Box>
        <Box
          sx={[
            authPageStyles.container.buttonsContainer,
            { gap: "5px", marginTop: "20px" },
          ]}
        >
          <Typography sx={authPageStyles.form.formSimpleText}>
            Alreay have an account?
          </Typography>
          <MuiLink
            component={RouterLink}
            to="/sign-in"
            underline="none"
            variant="body1"
            sx={authPageStyles.form.formSignUpLink}
          >
            Sign In
          </MuiLink>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SignUpPage;
