import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../../axiosInstance";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch } from "../../redux/store";

const TestPage = () => {
  const navigate = useNavigate();
  const [loggedInUserId, setLoggedInUserId] = useState<number>(1);
  const dispatch = useAppDispatch();

  const handleLogin = async (type: string) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/users/${loggedInUserId}`,
        { logged_in_as: type }
      );

      const { data } = await axiosInstance.get(
        `/api/v1/users/${loggedInUserId}?type=${type}`
      );
      if (data && response.data) {
        dispatch(initializeUser(data));
        if (type === "worker") {
          navigate("/jobs");
        } else if (type === "employer") {
          navigate("/services");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Box
      sx={{
        margin: "100px 0",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="body1">User Id</Typography>
      <TextField
        variant="outlined"
        // label="user id"
        value={loggedInUserId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLoggedInUserId(Number(e.target.value))
        }
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleLogin("worker")}
      >
        Log in as worker
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleLogin("employer")}
      >
        Log in as employer
      </Button>
    </Box>
  );
};

export default TestPage;
