import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Category } from "../../redux/type";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import CustomRating from "./CustomRating";

interface EmployerReviewFormProps {
  handleSetIsEmployerSuccessModalOpen: (value: boolean) => void;
}

const EmployerReviewForm: React.FC<EmployerReviewFormProps> = ({
  handleSetIsEmployerSuccessModalOpen,
}) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order);
  const user = useAppSelector((state) => state.user);
  const [categories, setCategories] = useState<Category[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [categoriesRating, setCategoriesRating] = useState<{
    [key: number]: number;
  }>({
    1: 0,
    2: 0,
    3: 0,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbar] = useState<boolean>(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/categories");
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getCategories();
  }, []);

  const handleSetRating = (categoryId: number, value: number) => {
    setCategoriesRating((prevCategoriesRating) => ({
      ...prevCategoriesRating,
      [categoryId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const values = Object.values(categoriesRating);
      const sum = values.reduce((acc, val) => acc + val, 0);
      const average = sum / values.length;

      const data = {
        feedback: feedback,
        overall_rating: average,
        order_id: order.id,
        user_id: user.id,
        review_for: "worker",
        reviewee_id: order.worker_user_id,
        category_rating: categoriesRating,
      };
      const response = await axiosInstance.post("/api/v1/reviews", data);
      if (response.status === 201) {
        const res = await axiosInstance.patch(`/api/v1/orders/${order.id}`, {
          status: "6",
        });

        if (res.status === 201) {
          dispatch(initializeUser({ ...user, orders: res.data.orders }));
          handleSetIsEmployerSuccessModalOpen(true);
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
      {categories.map((category) => (
        <CustomRating
          key={category.id}
          title={category.name}
          rating={categoriesRating[category?.id as number]}
          handleSetRating={(value) =>
            handleSetRating(category?.id as number, value)
          }
        />
      ))}
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

export default EmployerReviewForm;
