import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { isEmptyObject } from "./ProfileBasicInfoCard";

interface ProfileContactInfoCardProps {
  edittingSection: string;
  email: string;
  phoneNumber: string;
  sectionName: string;
  errorMessages: any;
  handleSetEdittingSection: () => void;
  handleSetEmail: (email: string) => void;
  handleSetPhoneNumber: (number: string) => void;
  handleSave: () => void;
  handleCancelEdittingSection: () => void;
}

const ProfileContactInfoCard: React.FC<ProfileContactInfoCardProps> = ({
  edittingSection,
  phoneNumber,
  sectionName,
  email,
  errorMessages,
  handleSetEdittingSection,
  handleSetEmail,
  handleSetPhoneNumber,
  handleSave,
  handleCancelEdittingSection,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #F58A47",
        borderRadius: "4px",
        padding: "20px",
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "0",
          }}
          onClick={handleSetEdittingSection}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "1.7",
        }}
      >
        Contact Info
      </Typography>

      <Typography
        sx={{
          fontFamily: "Open Sans",
          fontWeight: "400",
          fontSize: "12px",
          margin: "0 0 15px",
        }}
      >
        Some info may be visible to other people
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <TextField
          helperText={errorMessages.email}
          error={isEmptyObject(errorMessages, "email")}
          disabled={edittingSection !== sectionName}
          id="standard-start-adornment"
          sx={{ m: 1, width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Email</InputAdornment>
            ),
          }}
          variant="standard"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSetEmail(e.target.value)
          }
        />

        <TextField
          helperText={errorMessages.phone_number}
          error={isEmptyObject(errorMessages, "phone_number")}
          disabled={edittingSection !== sectionName}
          id="standard-start-adornment"
          sx={{ m: 1, width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Phone</InputAdornment>
            ),
          }}
          variant="standard"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSetPhoneNumber(e.target.value)
          }
        />

        {edittingSection === sectionName && (
          <ButtonGroup>
            <Button
              onClick={handleCancelEdittingSection}
              sx={{ marginTop: "20px" }}
              size="small"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              sx={{ marginTop: "20px", color: "common.white" }}
              size="small"
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Box>
  );
};

export default ProfileContactInfoCard;
