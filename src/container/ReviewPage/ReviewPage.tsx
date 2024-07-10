import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../../axiosInstance";
import CheckImage from "../../assets/check.png";
import RevieweeProfileCard from "../../components/RevieweeProfileCard/RevieweeProfileCard";
import EmployerReviewForm from "../../components/ReviewerForm/EmployerReviewForm";
import WorkerReviewForm from "../../components/ReviewerForm/WorkerReviewForm";
import CustomModal from "../../components/Tabs/Modal";
import { useAppSelector } from "../../redux/store";
import { Employer, Worker } from "../../redux/type";

const ReviewPage = () => {
  const navigate = useNavigate();
  const order = useAppSelector((state) => state.order);
  const user = useAppSelector((state) => state.user);
  const [reviewee, setReviewee] = useState<Worker | Employer | null>(null);
  const [isEmployerSuccessModalOpen, setIsEmployerSuccessModalOpen] =
    useState<boolean>(false);
  const [isEmployerWarningModalOpen, setIsEmployerWarningModalOpen] =
    useState<boolean>(false);
  const [isWorkerSuccessModalOpen, setIsWorkerSuccessModalOpen] =
    useState<boolean>(false);
  const [isWorkerWarningModalOpen, setIsWorkerWarningModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const getReviewee = async () => {
      let endpoint = "";
      if (user.logged_in_as == "worker") {
        endpoint = `/api/v1/employers/${order.employer_id}`;
      } else if (user.logged_in_as == "employer") {
        endpoint = `/api/v1/workers/${order.worker_id}`;
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
  }, [order]);

  return (
    <Box>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}
      >
        <IconButton
          onClick={() => {
            user.logged_in_as == "employer"
              ? setIsEmployerWarningModalOpen(true)
              : setIsWorkerWarningModalOpen(true);
          }}
        >
          <ArrowBackOutlined />
        </IconButton>
        <Typography variant="h6">Write a review</Typography>
      </Box>
      <RevieweeProfileCard reviewee={reviewee} />
      {user.logged_in_as === "worker" ? (
        <>
          <WorkerReviewForm
            handleSetIsWorkerSuccessModalOpen={(value) =>
              setIsWorkerSuccessModalOpen(value)
            }
          />
          <CustomModal
            isModalOpen={isWorkerSuccessModalOpen}
            handleCloseModal={() => navigate("/jobs")}
          >
            <Box
              sx={{
                padding: "24px",
                paddingBottom: 0,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <img src={CheckImage} alt="" />
              </Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1A1B21",
                  textAlign: "center",
                  fontFamily: "Poppins",
                  marginBottom: "10px",
                }}
              >
                Thank you for your review
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Your payment will be released within 1-3 business days or upon
                the employer's confirmation that the job is completed. We'll
                prompt your employer to leave a review to expedite the payment
                process. Thank you!
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "24px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ widht: "auto" }}
                  onClick={() => navigate("/jobs")}
                >
                  See Jobs
                </Button>
              </Box>
            </Box>
          </CustomModal>

          <CustomModal
            isModalOpen={isWorkerWarningModalOpen}
            handleCloseModal={() => navigate("/jobs")}
          >
            <Box
              sx={{
                padding: "24px",
                paddingBottom: 0,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningIcon color="warning" />
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                You may come back again to finish your review. This review is
                open for 14 days.
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Your review is needed to release your payment.
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "24px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: "auto" }} // Fixed typo in "widht" to "width"
                  onClick={() => navigate("/jobs")}
                >
                  Back to Jobs List
                </Button>
              </Box>
            </Box>
          </CustomModal>
        </>
      ) : (
        <>
          <EmployerReviewForm
            handleSetIsEmployerSuccessModalOpen={(value) =>
              setIsEmployerSuccessModalOpen(value)
            }
          />
          <CustomModal
            isModalOpen={isEmployerSuccessModalOpen}
            handleCloseModal={() => navigate("/jobs")}
          >
            <Box
              sx={{
                padding: "24px",
                paddingBottom: 0,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <img src={CheckImage} alt="" />
              </Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1A1B21",
                  textAlign: "center",
                  fontFamily: "Poppins",
                  marginBottom: "10px",
                }}
              >
                Thank you for your review
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                This review serves as your confirmation to proceed with
                releasing the payment to the worker.
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "24px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: "auto" }} // Fixed typo in "widht" to "width"
                  onClick={() => navigate("/jobs")}
                >
                  See Jobs
                </Button>
              </Box>
            </Box>
          </CustomModal>

          <CustomModal
            isModalOpen={isEmployerWarningModalOpen}
            handleCloseModal={() => navigate("/jobs")}
          >
            <Box
              sx={{
                padding: "24px",
                paddingBottom: 0,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningIcon color="warning" />
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                You may come back again to finish your review. This review is
                open for 14 days.
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                The review period extends for 14 days. Please be aware that your
                input is crucial for processing the worker's compensation. If no
                review is provided within 24 hours, it will be considered as
                consent for releasing the compensation. Thank you!
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "24px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: "auto" }}
                  onClick={() => navigate("/jobs")}
                >
                  Back to Jobs List
                </Button>
              </Box>
            </Box>
          </CustomModal>
        </>
      )}
    </Box>
  );
};

export default ReviewPage;
