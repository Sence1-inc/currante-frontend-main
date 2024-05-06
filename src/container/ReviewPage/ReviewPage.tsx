import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../../axiosInstance";
import RevieweeProfileCard from "../../components/RevieweeProfileCard/RevieweeProfileCard";
import EmployerReviewForm from "../../components/ReviewerForm/EmployerReviewForm";
import WorkerReviewForm from "../../components/ReviewerForm/WorkerReviewForm";
import { useAppSelector } from "../../redux/store";
import { Employer, Worker } from "../../redux/type";

const ReviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAppSelector((state) => state.user);
  const [reviewee, setReviewee] = useState<Worker | Employer | null>(null);

  useEffect(() => {
    const getReviewee = async () => {
      let endpoint = "";
      if (user.logged_in_as == "worker") {
        endpoint = `/api/v1/employers/${id}`;
      } else {
        endpoint = `/api/v1/workers/${id}`;
      }
      try {
        const response = await axiosInstance.get(endpoint);
        if (response.data) {
          setReviewee(response.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getReviewee();
  }, [id]);

  return (
    <Box>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackOutlined />
        </IconButton>
        <Typography variant="h6">Write a review</Typography>
      </Box>
      <RevieweeProfileCard reviewee={reviewee} />
      {user.logged_in_as === "worker" ? (
        <WorkerReviewForm />
      ) : (
        <EmployerReviewForm />
      )}
    </Box>
  );
};

export default ReviewPage;
