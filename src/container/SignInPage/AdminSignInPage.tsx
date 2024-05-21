import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../../axiosInstance";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { initializeIsAuthenticated } from "../../redux/reducers/IsAuthenticatedReducer";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch } from "../../redux/store";
import authPageStyles from "../../styles/authPageStyles";

type Errors = {
  email: string;
  password: string;
};

const AdminSignInPage = () => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const data = {
        email: userCredentials.email,
        password: userCredentials.password,
        service_id: Number(import.meta.env.VITE_SERVICE_ID),
        service_key: import.meta.env.VITE_SERVICE_KEY,
        role: "admin",
      };

      const response = await axiosInstance.post("/api/v1/login", data);
      if (response.data.user) {
        dispatch(initializeUser(response.data.user));
        dispatch(initializeIsAuthenticated(true));

        navigate("/admin");
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
              onClick={handleSignIn}
              variant="contained"
              color="primary"
              sx={authPageStyles.form.formButton}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminSignInPage;
