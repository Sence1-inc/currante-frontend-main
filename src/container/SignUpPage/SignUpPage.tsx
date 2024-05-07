import { addDoc, collection } from "@firebase/firestore";
import { Box, Button, Link as MuiLink, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { db } from "../../firebase";
import authPageStyles from "../../styles/authPageStyles";

interface SignUpPageProps {}

type Errors = {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  middle_name: string;
};

export type UserCredentialsType = {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  middle_name: string;
};

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [userCredentials, setUserCredentials] = useState<UserCredentialsType>({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    middle_name: "",
  });
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    middle_name: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(userCredentials.email);
  const isPasswordValid = userCredentials.password.length > 6;
  const isPassword2 = userCredentials.password === userCredentials.password2;

  const validationConditions = [
    {
      condition: !isValidEmail || !userCredentials.email,
      field: "email",
      message: "Please provide a valid email address.",
    },
    {
      condition: !isPasswordValid || !userCredentials.password,
      field: "password",
      message: "Password must be atleast 6 characters.",
    },
    {
      condition: !isPassword2 || !userCredentials.password2,
      field: "password2",
      message: "Password does not match.",
    },
    {
      condition: !userCredentials.first_name,
      field: "first_name",
      message: "Please provide first name.",
    },
    {
      condition: !userCredentials.middle_name,
      field: "middle_name",
      message: "Please provide middle name.",
    },
    {
      condition: !userCredentials.last_name,
      field: "last_name",
      message: "Please provide last name.",
    },
  ];

  useEffect(() => {
    if (userCredentials) {
      validationConditions.forEach((validationCondition) => {
        if (!validationCondition.condition) {
          console.log(validationCondition);
          setErrors({ ...errors, [validationCondition.field]: "" });
        }
      });
    }
  }, [userCredentials]);

  const handleSignUp = async (role: string) => {
    const errorMessages = validationConditions
      .filter(({ condition }) => condition)
      .map(({ message }) => message);
    const hasErrors = errorMessages.length > 0;

    if (hasErrors) {
      setSuccessMessage("");
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
          setIsSnackbarOpen(true);
          setErrors({
            email: "",
            password: "",
            password2: "",
            first_name: "",
            last_name: "",
            middle_name: "",
          });
          setSuccessMessage(
            "Verification email has been sent. Please verify email before logging in."
          );
        }
      } catch (error: any) {
        setIsSnackbarOpen(true);
        setErrorMessage(error.response.data.message);
        console.log("Registration error: ", error);
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
      <Header />
      <CustomSnackbar
        errorMessage={errorMessage}
        successMessage={successMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
      <Box sx={authPageStyles.container.mainContainer}>
        <Box sx={authPageStyles.container.innerContainer}>
          <Typography sx={authPageStyles.form.heading}>Sign-up</Typography>
          <CustomTextField
            inputType="text"
            label="First name"
            placeholder="Enter your first name"
            error={errors.first_name}
            handleSetUserCredentials={(value) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                first_name: value,
              }))
            }
          />
          <CustomTextField
            inputType="text"
            label="Middle name"
            placeholder="Enter your middle name"
            error={errors.middle_name}
            handleSetUserCredentials={(value) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                middle_name: value,
              }))
            }
          />
          <CustomTextField
            inputType="text"
            label="Last name"
            placeholder="Enter your last name"
            error={errors.last_name}
            handleSetUserCredentials={(value) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                last_name: value,
              }))
            }
          />
          <CustomTextField
            inputType="email"
            label="Email"
            placeholder="Enter your valid email"
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
            error={errors.password}
            handleSetUserCredentials={(value) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                password: value,
              }))
            }
          />
          <CustomTextField
            inputType="password"
            label="Confirm password"
            placeholder="Confirm your password"
            error={errors.password2}
            handleSetUserCredentials={(value) =>
              setUserCredentials((prevUserCredentials) => ({
                ...prevUserCredentials,
                password2: value,
              }))
            }
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
