import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrivedImage from "../../assets/arrived.png";
import CheckImage from "../../assets/check.png";
import QuestionImage from "../../assets/question.png";
import jobListStyles from "../../styles/jobListStyles";
import CustomModal from "./Modal";

interface TabModalProps {
  status: string;
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const TabModal: React.FC<TabModalProps> = ({
  status,
  openModal,
  handleCloseModal,
}) => {
  const [inputOTP, setInputOTP] = useState<string>("");
  const [validOTP, setValidOTP] = useState<boolean>(false);

  const handleClick = () => {
    console.log("clicked");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputOTP(event.target.value);
  };

  const handleOTPInput = () => {
    if (inputOTP.length < 6) {
      console.log("Invalid OTP");
    }

    setValidOTP(true);
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

  const incomingModalContent = () => {
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
            Quezon City
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
            Feb. 10 7am-12pm
          </Typography>
        </Box>
        <Box sx={jobListStyles.container.buttonContainer}>
          <Button
            onClick={handleCloseModal}
            sx={jobListStyles.button.secondary}
          >
            Rethink
          </Button>
          <Button onClick={handleClick} sx={jobListStyles.button.primary}>
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
          <Button onClick={handleOTPInput} sx={jobListStyles.button.primary}>
            Complete
          </Button>
        </Box>
      </CustomModal>
    );
  };

  const currentModalContent = () => {
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
          <Button onClick={handleClick} sx={jobListStyles.button.primary}>
            Start
          </Button>
        </Box>
      </CustomModal>
    );
  };

  const renderModal = () => {
    if (status === "incoming") {
      return incomingModalContent();
    } else if (status === "completed") {
      if (!validOTP) {
        return completedModalContent();
      } else {
        return completedConfirm();
      }
    } else {
      return currentModalContent();
    }
  };

  return renderModal();
};

export default TabModal;
