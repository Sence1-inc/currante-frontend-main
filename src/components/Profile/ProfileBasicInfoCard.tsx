import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  ButtonGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
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
  email: string;
  phoneNumber: string;
  sectionName: string;
  birthday: Date | Dayjs | null | string;
  errorMessages: any;
  handleSetEdittingSection: () => void;
  handleSetFirstName: (name: string) => void;
  handleSetMiddleName: (name: string) => void;
  handleSetLastName: (name: string) => void;
  handleSetGender: (name: string) => void;
  handleSetBirthday: (birthday: Dayjs | null) => void;
  handleSetEmail: (email: string) => void;
  handleSetPhoneNumber: (number: string) => void;
  handleSave: () => void;
  handleCancelEdittingSection: () => void;
  isButtonLoading: {
    save: boolean;
    cancel: boolean;
  };
}

export const isEmptyObject = (
  errorMessages: Record<string, string>,
  key: string
): boolean => {
  const keys =
    errorMessages &&
    typeof errorMessages === "object" &&
    Object.keys(errorMessages).filter((messageKey: string) => {
      return errorMessages[messageKey] !== "";
    });

  if (keys === false) {
    return false;
  }

  return keys?.includes(key);
};

const ProfileBasicInfoCard: React.FC<ProfileBasicInfoCardProps> = ({
  edittingSection,
  firstName,
  middleName,
  lastName,
  gender,
  sectionName,
  errorMessages,
  birthday,
  email,
  phoneNumber,
  handleSetEdittingSection,
  handleSetFirstName,
  handleSetMiddleName,
  handleSetLastName,
  handleSetGender,
  handleSetBirthday,
  handleSetEmail,
  handleSetPhoneNumber,
  handleSave,
  handleCancelEdittingSection,
  isButtonLoading,
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
        Basic and Contact Info
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
          error={isEmptyObject(errorMessages, "first_name")}
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
          helperText={errorMessages?.first_name}
        />
        <TextField
          error={isEmptyObject(errorMessages, "middle_name")}
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
          helperText={errorMessages?.middle_name}
        />
        <TextField
          error={isEmptyObject(errorMessages, "last_name")}
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
          helperText={errorMessages?.last_name}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {birthday !== null ? (
            <DatePicker
              disabled={edittingSection !== sectionName}
              slotProps={{
                textField: {
                  helperText: errorMessages?.birthday,
                  variant: "standard",
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">Birthday</InputAdornment>
                    ),
                  },
                },
              }}
              sx={{
                m: 1,
                width: "100%",
                "& .MuiFormHelperText-root": {
                  color: "#d32f2f",
                },
              }}
              value={dayjs(birthday)}
              onChange={(date) => handleSetBirthday(date)}
            />
          ) : (
            <DatePicker
              value={birthday ? dayjs(birthday) : null}
              disabled={edittingSection !== sectionName}
              slotProps={{
                textField: {
                  helperText: errorMessages?.birthday,
                  variant: "standard",
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">Birthday</InputAdornment>
                    ),
                  },
                },
              }}
              sx={{
                m: 1,
                width: "100%",
                "& .MuiFormHelperText-root": {
                  color: "#d32f2f",
                },
              }}
              onChange={(date) => handleSetBirthday(date)}
            />
          )}
        </LocalizationProvider>

        <Box>
          <Select
            error={isEmptyObject(errorMessages, "gender")}
            disabled={edittingSection !== sectionName}
            sx={{ marginLeft: 1, width: "100%", textAlign: "start" }}
            value={gender}
            onChange={(e) => handleSetGender(e.target.value as string)}
            startAdornment={
              <InputAdornment position="start">Gender</InputAdornment>
            }
            variant="standard"
            displayEmpty
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
          <FormHelperText sx={{ marginLeft: 1, p: 0, color: "#d32f2f" }}>
            {errorMessages?.gender}
          </FormHelperText>
        </Box>

        <TextField
          helperText={errorMessages?.email}
          error={isEmptyObject(errorMessages, "email")}
          disabled
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
          helperText={errorMessages?.phone_number}
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
            <LoadingButton
              disabled={isButtonLoading.save}
              loading={isButtonLoading.cancel}
              loadingPosition="center"
              onClick={handleCancelEdittingSection}
              sx={{ marginTop: "20px" }}
              size="small"
              variant="contained"
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              disabled={isButtonLoading.cancel}
              loading={isButtonLoading.save}
              loadingPosition="center"
              color="secondary"
              sx={{ marginTop: "20px", color: "common.white" }}
              size="small"
              variant="contained"
              onClick={handleSave}
            >
              Save
            </LoadingButton>
          </ButtonGroup>
        )}
      </Box>
    </Box>
  );
};

export default ProfileBasicInfoCard;
