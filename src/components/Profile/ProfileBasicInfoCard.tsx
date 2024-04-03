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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

interface ProfileBasicInfoCardProps {
  edittingSection: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  sectionName: string;
  birthday: Date | Dayjs | null | string;
  handleSetEdittingSection: () => void;
  handleSetFirstName: (name: string) => void;
  handleSetMiddleName: (name: string) => void;
  handleSetLastName: (name: string) => void;
  handleSetGender: (name: string) => void;
  handleSetBirthday: (birthday: Dayjs | null) => void;
  handleSave: () => void;
  handleCancelEdittingSection: () => void;
}

const ProfileBasicInfoCard: React.FC<ProfileBasicInfoCardProps> = ({
  edittingSection,
  firstName,
  middleName,
  lastName,
  gender,
  sectionName,
  birthday,
  handleSetEdittingSection,
  handleSetFirstName,
  handleSetMiddleName,
  handleSetLastName,
  handleSetGender,
  handleSetBirthday,
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
        margin: "0 0 20px",
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
        Basic Info
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
          disabled={edittingSection !== sectionName}
          id="standard-start-adornment"
          sx={{ m: 1, width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">First Name</InputAdornment>
            ),
          }}
          variant="standard"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSetFirstName(e.target.value)
          }
        />
        <TextField
          disabled={edittingSection !== sectionName}
          id="standard-start-adornment"
          sx={{ m: 1, width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Middle Name</InputAdornment>
            ),
          }}
          variant="standard"
          value={middleName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSetMiddleName(e.target.value)
          }
        />
        <TextField
          disabled={edittingSection !== sectionName}
          id="standard-start-adornment"
          sx={{ m: 1, width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Last Name</InputAdornment>
            ),
          }}
          variant="standard"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSetLastName(e.target.value)
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {birthday !== null ? (
            <DatePicker
              disabled={edittingSection !== sectionName}
              slotProps={{
                textField: {
                  variant: "standard",
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">Birthday</InputAdornment>
                    ),
                  },
                },
              }}
              sx={{ m: 1, width: "100%" }}
              value={dayjs(birthday)}
              onChange={(date) => handleSetBirthday(date)}
            />
          ) : (
            <DatePicker
              disabled={edittingSection !== sectionName}
              slotProps={{
                textField: {
                  variant: "standard",
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">Birthday</InputAdornment>
                    ),
                  },
                },
              }}
              sx={{ m: 1, width: "100%" }}
              onChange={(date) => handleSetBirthday(date)}
            />
          )}
        </LocalizationProvider>

        <TextField
          disabled={edittingSection !== sectionName}
          id="standard-start-adornment"
          sx={{ m: 1, width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Gender</InputAdornment>
            ),
          }}
          variant="standard"
          value={gender}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSetGender(e.target.value)
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

export default ProfileBasicInfoCard;
