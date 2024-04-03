import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

interface ProfileScheduleCardProps {
  edittingSection: string;
  schedule: string;
  sectionName: string;
  handleSetEdittingSection: () => void;
  handleSave: () => void;
  handleCancelEdittingSection: () => void;
  handleSetSchedule: (schedule: string) => void;
}

const ProfileScheduleCard: React.FC<ProfileScheduleCardProps> = ({
  edittingSection,
  schedule,
  sectionName,
  handleSetEdittingSection,
  handleSave,
  handleCancelEdittingSection,
  handleSetSchedule,
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
        Business Hours
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

      <Box
        sx={{
          paddingRight: "20px",
          textAlign: "center",
        }}
      >
        <TextField
          disabled={edittingSection !== sectionName}
          fullWidth
          id="standard-start-adornment"
          sx={{ m: 1 }}
          variant="standard"
          value={schedule}
          multiline
          minRows={1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSetSchedule(e.target.value)
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

export default ProfileScheduleCard;
