import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface CustomizedDialogProp {
  handleIsOpen: (value: boolean) => void;
  handleButtonClick: () => void;
  isOpen: boolean;
  title: string;
  buttonTitle: string;
  children: React.ReactNode;
  isButtonDisabled?: boolean;
  isButtonLoading?: boolean;
}

const CustomizedDialog: React.FC<CustomizedDialogProp> = ({
  handleIsOpen,
  handleButtonClick,
  isOpen,
  title,
  buttonTitle,
  children,
  isButtonDisabled = false,
  isButtonLoading = false,
}) => {
  return (
    <BootstrapDialog
      onClose={() => handleIsOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleIsOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions sx={{ alignSelf: "center" }}>
        <LoadingButton
          loading={isButtonLoading}
          loadingPosition="center"
          variant="contained"
          disabled={isButtonDisabled}
          autoFocus
          onClick={handleButtonClick}
        >
          {buttonTitle}
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CustomizedDialog;
