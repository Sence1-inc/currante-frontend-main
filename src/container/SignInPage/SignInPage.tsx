import { Box, Button, Link as MuiLink, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { initializeIsAuthenticated } from "../../redux/reducers/IsAuthenticatedReducer";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch } from "../../redux/store";
import authPageStyles from "../../styles/authPageStyles";

interface SignInPageProps {}

type Errors = {
  email: string;
  password: string;
};

const SignInPage: React.FC<SignInPageProps> = () => {
  const dispatch = useAppDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignIn = async (role: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(userCredentials.email);

    const validationConditions = [
      {
        condition: !isValidEmail || !userCredentials.email,
        field: "email",
        message: "Please provide a valid registered email address.",
      },
      {
        condition: !userCredentials.password,
        field: "password",
        message: "Please provide a valid password.",
      },
    ];

    const errorMessages = validationConditions
      .filter(({ condition }) => condition)
      .map(({ message }) => message);
    const hasErrors = errorMessages.length > 0;

    if (hasErrors) {
      setIsSnackbarOpen(true);
      setErrorMessage("Please fill in the required details.");
      const newErrors = validationConditions.reduce<{ [key: string]: string }>(
        (acc, { condition, field, message }) => {
          if (condition) {
            acc[field] = message;
          }
          return acc;
        },
        {}
      );

      setErrors({ ...errors, ...newErrors });
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
          dispatch(initializeIsAuthenticated(true));

          if (response.data.user.logged_in_as === "worker") {
            navigate("/jobs");
          } else if (response.data.user.logged_in_as === "employer") {
            navigate("/services");
            // navigate(-1) === undefined ? navigate("/services") : navigate(-1);
          } else {
            navigate("/");
          }
        }
      } catch (error: any) {
        setIsSnackbarOpen(true);
        setErrorMessage(error.response.data.message);
        if (error.response.status === 400) {
          setErrors({
            email: "",
            password: "",
          });
        }
        console.log("Error logging in: ", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CustomSnackbar
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
      <Header />
      <Box sx={authPageStyles.container.mainContainer}>
        <Box sx={authPageStyles.container.innerContainer}>
          <Typography sx={authPageStyles.form.heading}>Sign-in</Typography>
          <CustomTextField
            inputType="email"
            label="Email address"
            placeholder="Enter your registered email"
            error={errors.email}
            handleSetUserCredentials={(value) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                email: value,
              }))
            }
          />
          <CustomTextField
            inputType="password"
            label="Password"
            placeholder="Enter your password"
            error={errors.email}
            handleSetUserCredentials={(value) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                password: value,
              }))
            }
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
