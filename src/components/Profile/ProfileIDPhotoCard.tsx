import { CameraAlt, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/store";
import { User } from "../../redux/type";

interface ProfileIDPhotoCardProps {
  edittingSection: string;
  sectionName: string;
  idImage: string | null;
  handleSetEdittingSection: () => void;
  handleUpload: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancelEdittingSection: () => void;
}

const ProfileIDPhotoCard: React.FC<ProfileIDPhotoCardProps> = ({
  edittingSection,
  handleSetEdittingSection,
  handleUpload,
  idImage,
  handleImageChange,
  sectionName,
  handleCancelEdittingSection,
}) => {
  const user: User = useAppSelector((state) => state.user);
  return (
    <Box
      sx={{
        border: "1px solid #F58A47",
        borderRadius: "4px",
        padding: "20px",
        textAlign: "left",
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "1.7",
          }}
        >
          Philsys ID
        </Typography>

        {!user.is_identification_verified && (
          <Box
            sx={{
              position: "relative",
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
              <Edit fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
      {edittingSection === sectionName ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload-button"
              type="file"
              onChange={handleImageChange}
            />
            <label
              htmlFor="avatar-upload-button"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CameraAlt />
                <Typography variant="subtitle1">
                  Click to choose photo
                </Typography>
              </Box>
            </label>
          </div>
          {idImage && <img src={idImage} width="100%" />}
          <ButtonGroup>
            <Button
              onClick={handleCancelEdittingSection}
              size="small"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              sx={{ color: "common.white" }}
              size="small"
              variant="contained"
              onClick={handleUpload}
            >
              Save
            </Button>
          </ButtonGroup>
        </Box>
      ) : user.is_identification_verified ? (
        <Typography color="success">Your ID has been verified</Typography>
      ) : user.identification_photo ? (
        <Typography>Your ID is being verified</Typography>
      ) : (
        <Typography>
          To verify your identification, upload you Philsys ID
        </Typography>
      )}
    </Box>
  );
};

export default ProfileIDPhotoCard;
