import { FormControl } from "@mui/base";
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../../axiosInstance";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [type, setType] = useState<string>("employer");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const handleSubscribe = async () => {
    try {
      const data = {
        email: email,
        subscriber_type: type,
      };

      // console.log(data);
      const response = await axiosInstance.post("/api/v1/subscribers", data);

      if (response.data) {
        setErrorMessage("");
        setSuccessMessage(response.data.message);
        setIsSnackbarOpen(true);
      }
    } catch (error) {
      setIsSnackbarOpen(true);
      setSuccessMessage("");
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage =
            error.response.data.message || "An error occurred";
          setErrorMessage(errorMessage);
        } else if (error.request) {
          setErrorMessage("No response received from the server");
        } else {
          setErrorMessage("Error setting up the request");
        }
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F5F6FA",
        width: { md: "60%", sm: "100%" },
        margin: { md: "auto", xs: "50px 0" },
        padding: { xs: "80px 20px 80px 20px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
      }}
    >
      <Typography
        sx={{
          fontSize: "54px",
          lineHeight: "54px",
          fontWeight: 700,
          color: "#0E2F71",
        }}
      >
        Newsletter
      </Typography>
      <Typography
        sx={{ fontSize: "16px", fontWeight: 600, textAlign: "center" }}
      >
        Stay informed and engaged with exclusive content and benefits by
        subscribing to our newsletter at Currante.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <FormControl style={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="employer"
            name="radio-buttons-group-user-type"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onChange={handleTypeChange}
          >
            <FormControlLabel
              value="worker"
              control={<Radio />}
              label="I am a worker"
            />
            <FormControlLabel
              value="employer"
              control={<Radio />}
              label="I am an employer"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          sx={{
            "& fieldset": { border: "none" },
            borderRadius: "16px",
            border: "1px solid #0E2F71",
          }}
          id="outlined-basic"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <Button
          sx={{
            bgcolor: "#F58A47",
            borderRadius: "16px",
            padding: "15px 20px 15px 20px",
            "&:hover": {
              backgroundColor: "#0E2F71",
            },
          }}
          variant="contained"
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
        <Typography
          sx={{ fontSize: "13px", fontWeight: 400, textAlign: "center" }}
        >
          By subscribing to the newsletter, I have read this form and understand
          its content and voluntarily give my consent for the collection, use,
          processing, storage and retention of my personal data or information
          to Sence1 for the purpose(s) described in the Privacy Policy
        </Typography>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={3000}
        message={successMessage ? successMessage : errorMessage}
        key="topcenter"
        sx={{
          color: errorMessage ? "red" : "green",
          marginBottom: "16px",
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setIsSnackbarOpen(false)}
          severity={successMessage ? "success" : "error"}
        >
          {successMessage ? successMessage : errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Newsletter;
