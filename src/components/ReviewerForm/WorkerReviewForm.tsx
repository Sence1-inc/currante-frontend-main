import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import CustomRating from "./CustomRating";

interface WorkerReviewFormProps {
  handleSetIsWorkerSuccessModalOpen: (value: boolean) => void;
}

const WorkerReviewForm: React.FC<WorkerReviewFormProps> = ({
  handleSetIsWorkerSuccessModalOpen,
}) => {
  const order = useAppSelector((state) => state.order);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [feedback, setFeedback] = useState<string>("");
  const [overallRating, setOverallRating] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbar] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const data = {
        feedback: feedback,
        overall_rating: overallRating,
        order_id: order.id,
        user_id: user.id,
        review_for: "employer",
        reviewee_id: order.employer_user_id,
      };
      const response = await axiosInstance.post("/api/v1/reviews", data);
      if (response.status === 201) {
        const res = await axiosInstance.patch(`/api/v1/orders/${order.id}`, {
          status: "5",
        });

        if (res.status === 201) {
          dispatch(initializeUser({ ...user, orders: res.data.orders }));
          handleSetIsWorkerSuccessModalOpen(true);
          setIsSnackbar(false);
          setErrorMessage("");
        }
      }
    } catch (error: any) {
      setIsSnackbar(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <CustomRating
        handleSetRating={(value) => setOverallRating(value)}
        rating={overallRating}
        title="Rate your employer"
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="body1">Type 200 characters</Typography>
        <TextField
          value={feedback}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFeedback(e.target.value)
          }
          fullWidth
          multiline
          rows={4}
          placeholder="Tell us your experience"
        />
      </Box>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <CustomSnackbar
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbar(value)}
      />
    </Box>
  );
};

export default WorkerReviewForm;
