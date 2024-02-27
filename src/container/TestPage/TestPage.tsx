import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import api from "../../../axiosInstance";

const TestPage = () => {
  const [name, setName] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const handleClick = () => {
    api
      .post("/api/tests", { name: name })
      .then((response) => {
        setSuccessMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h1">TEST CONNECTION</Typography>
      <TextField
        onChange={(e) => setName(e.target.value)}
        value={name}
        id="outlined-basic"
        label="Enter test name"
        variant="outlined"
      />
      <Button onClick={handleClick} variant="outlined">
        Submit
      </Button>
      {successMessage && <Typography>{successMessage}</Typography>}
    </Box>
  );
};

export default TestPage;
