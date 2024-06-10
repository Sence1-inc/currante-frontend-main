import { Box, Button, TextField, Typography } from "@mui/material";
import { addMinutes, formatISO } from "date-fns";
import dayjs from "dayjs";
import React, { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import ArrivedImage from "../../assets/arrived.png";
import CheckImage from "../../assets/check.png";
import QuestionImage from "../../assets/question.png";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Order } from "../../redux/type";
import jobListStyles from "../../styles/jobListStyles";
import CustomModal from "./Modal";

interface TabModalProps {
  order: Order;
  status: string;
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const TabModal: React.FC<TabModalProps> = ({
  order,
  status,
  openModal,
  handleCloseModal,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [isvalidOTP, setIsValidOTP] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const handleAccept = async () => {
    try {
      const response = await axiosInstance.patch(`/api/v1/orders/${order.id}`, {
        status: "2",
      });
      if (response.data) {
        dispatch(initializeUser({ ...user, orders: response.data.orders }));
        handleCloseModal();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getUtcNow = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const utcNow = addMinutes(now, offset);
    return formatISO(utcNow);
  };

  const handleArrived = async () => {
    try {
      const response = await axiosInstance.patch(`/api/v1/orders/${order.id}`, {
        status: "3",
        worker_arrived_date: getUtcNow(),
      });
      if (response.data) {
        dispatch(initializeUser({ ...user, orders: response.data.orders }));
        handleCloseModal();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleWorkComplete = async () => {
    if (otp === "" && otp.length < 6) {
      console.log("Please input OTP");
    } else {
      try {
        const response = await axiosInstance.patch(
          `/api/v1/orders/${order.id}`,
          {
            status: "4",
            job_order_completed_date: getUtcNow(),
            otp: otp,
          }
        );
        if (response.data) {
          setIsValidOTP(true);
          dispatch(initializeUser({ ...user, orders: response.data.orders }));
          handleCloseModal();
        }
      } catch (error) {
        setIsValidOTP(false);
        console.log("Error: ", error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };

  const completedConfirm = () => {
    return (
      <CustomModal isModalOpen={openModal} handleCloseModal={handleCloseModal}>
        <Box sx={{ padding: "24px", paddingBottom: 0 }}>
          <Box sx={{ textAlign: "center" }}>
            <img src={CheckImage} alt="" />
          </Box>
          <Typography sx={jobListStyles.modal.heading}>Thank you!</Typography>
          <Typography
            sx={[
              jobListStyles.modal.text,
              { marginBottom: "14px", fontWeight: "regular" },
            ]}
          >
            Your OTP has been sent to your employer. You may now start working.
          </Typography>
        </Box>
        <Box sx={jobListStyles.container.buttonContainer}>
          <Button onClick={handleCloseModal} sx={jobListStyles.button.primary}>
            Confirm
          </Button>
        </Box>
      </CustomModal>
    );
  };

  const requestModalContent = () => {
    return (
      <CustomModal isModalOpen={openModal} handleCloseModal={handleCloseModal}>
        <Box sx={{ padding: "24px", paddingBottom: 0 }}>
          <Box sx={{ textAlign: "center" }}>
            <img src={QuestionImage} alt="" />
          </Box>
          <Typography sx={jobListStyles.modal.heading}>Accept work?</Typography>
          <Typography
            sx={[
              jobListStyles.modal.text,
              { marginBottom: "2px", fontWeight: "regular" },
            ]}
          >
            You are about to accept house cleaning work from {}.
          </Typography>
          <Typography
            sx={[
              jobListStyles.modal.text,
              { marginBottom: "2px", fontWeight: "bold" },
            ]}
          >
            Work information:
          </Typography>
          <Typography
            sx={[
              jobListStyles.modal.text,
              { marginBottom: "2px", fontWeight: "regular" },
            ]}
          >
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Location:
            </Typography>{" "}
            {order.employer_address}
          </Typography>
          <Typography
            sx={[
              jobListStyles.modal.text,
              { marginBottom: "2px", fontWeight: "regular" },
            ]}
          >
            <Typography sx={{ fontWeight: 600, display: "inline" }}>
              Time:
            </Typography>{" "}
            {formatISO(new Date(dayjs(order.job_order_start_date).format()))}
          </Typography>
        </Box>
        <Box sx={jobListStyles.container.buttonContainer}>
          <Button
            onClick={handleCloseModal}
            sx={jobListStyles.button.secondary}
          >
            Rethink
          </Button>
          <Button onClick={handleAccept} sx={jobListStyles.button.primary}>
            Accept
          </Button>
        </Box>
      </CustomModal>
    );
  };

  const completedModalContent = () => {
    return (
      <CustomModal isModalOpen={openModal} handleCloseModal={handleCloseModal}>
        <Box sx={{ padding: "24px", paddingBottom: 0 }}>
          <Box sx={{ textAlign: "center" }}>
            <img src={CheckImage} alt="" />
          </Box>
          <Typography sx={jobListStyles.modal.heading}>
            Job completed?
          </Typography>
          <Typography
            sx={[
              jobListStyles.modal.text,
              { marginBottom: "14px", fontWeight: "regular" },
            ]}
          >
            By completing the job, you agree that the work is done.
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            label="Enter OTP sent to your phone number"
            id="outlined-size-normal"
            defaultValue=""
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={jobListStyles.container.buttonContainer}>
          <Button
            onClick={handleCloseModal}
            sx={jobListStyles.button.secondary}
          >
            Back
          </Button>
          <Button
            onClick={handleWorkComplete}
            sx={jobListStyles.button.primary}
          >
            Complete
          </Button>
        </Box>
      </CustomModal>
    );
  };

  const incomingModalContent = () => {
    return (
      <CustomModal isModalOpen={openModal} handleCloseModal={handleCloseModal}>
        <Box sx={{ padding: "24px", paddingBottom: 0 }}>
          <Box sx={{ textAlign: "center" }}>
            <img src={ArrivedImage} alt="" />
          </Box>
          <Typography sx={jobListStyles.modal.heading}>
            Arrived at your destination?
          </Typography>
          <Typography
            sx={[
              jobListStyles.modal.text,
              { marginBottom: "14px", fontWeight: "regular" },
            ]}
          >
            By confirming, OTP will be sent to your employer. Be sure to check
            if OTP arrived before you start working. Thank you!
          </Typography>
        </Box>
        <Box sx={jobListStyles.container.buttonContainer}>
          <Button
            onClick={handleCloseModal}
            sx={jobListStyles.button.secondary}
          >
            Not Yet
          </Button>
          <Button onClick={handleArrived} sx={jobListStyles.button.primary}>
            Start
          </Button>
        </Box>
      </CustomModal>
    );
  };

  const renderModal = () => {
    if (status == "1") {
      return requestModalContent();
    } else if (status == "4" || status == "3") {
      if (!isvalidOTP) {
        return completedModalContent();
      } else {
        return completedConfirm();
      }
    } else {
      return incomingModalContent();
    }
  };

  return renderModal();
};

export default TabModal;
