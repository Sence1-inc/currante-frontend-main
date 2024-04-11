import { Box, Modal } from "@mui/material";
import React from "react";
import jobListStyles from "../../styles/jobListStyles";

interface CustomModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isModalOpen,
  handleCloseModal,
  children,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={jobListStyles.container.modalContainer}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
