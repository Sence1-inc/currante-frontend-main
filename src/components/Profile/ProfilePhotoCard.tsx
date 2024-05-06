import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { User } from "../../redux/type";
import { isEmptyObject } from "./ProfileBasicInfoCard";

interface ProfilePhotoCardProps {
  edittingSection: string;
  avatarImage: string | null;
  description: string;
  sectionName: string;
  user: User;
  errorMessages: any;
  handleSetEdittingSection: () => void;
  handleAvatarImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  handleSetDescription: (description: string) => void;
  handleSave: () => void;
  handleCancelEdittingSection: () => void;
}

const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = ({
  edittingSection,
  avatarImage,
  description,
  sectionName,
  user,
  errorMessages,
  handleSetEdittingSection,
  handleAvatarImageChange,
  handleUpload,
  handleSetDescription,
  handleSave,
  handleCancelEdittingSection,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
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
          }}
          onClick={() => handleSetEdittingSection()}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
      {edittingSection === sectionName ? (
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
            onChange={handleAvatarImageChange}
          />
          <label htmlFor="avatar-upload-button">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          {avatarImage && (
            <Avatar
              src={avatarImage}
              sx={{
                border: "1px solid #F58A47",
                borderRadius: "90px",
                width: "90px",
                height: "90px",
                padding: "10px",
                backgroundColor: "background.default",
                color: "primary.main",
              }}
            />
          )}
          {avatarImage && <button onClick={handleUpload}>Upload</button>}
        </div>
      ) : avatarImage ? (
        <Avatar
          sx={{
            border: "1px solid #F58A47",
            borderRadius: "90px",
            width: "90px",
            height: "90px",
            padding: "10px",
            backgroundColor: "background.default",
            color: "primary.main",
          }}
        />
      ) : (
        <Avatar
          sx={{
            border: "1px solid #F58A47",
            borderRadius: "90px",
            width: "90px",
            height: "90px",
            padding: "10px",
            backgroundColor: "background.default",
            color: "primary.main",
          }}
        >
          {user.first_name.charAt(0)}
        </Avatar>
      )}

      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: "22px",
          color: "#F58A47",
        }}
      >
        {user.first_name} {user.middle_name} {user.last_name}
      </Typography>

      <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
        <Rating
          precision={0.5}
          size="small"
          name="read-only"
          value={Number(user?.overall_rating)}
          readOnly
        />

        <Typography>{`(${Number(user?.overall_rating)} stars)`}</Typography>
      </Box>

      {user.logged_in_as === "worker" &&
        (edittingSection !== sectionName ? (
          <>
            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "1.6",
                margin: "10px 0 20px",
              }}
            >
              {description}
            </Typography>
            {errorMessages.description && (
              <Typography color="error">{errorMessages.description}</Typography>
            )}
          </>
        ) : (
          <TextField
            error={isEmptyObject(errorMessages, "description")}
            multiline
            minRows={1}
            id="standard-start-adornment"
            sx={{ m: 1, width: "100%" }}
            variant="standard"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetDescription(e.target.value)
            }
            helperText={errorMessages.description}
          />
        ))}

      {edittingSection === sectionName && (
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
            onClick={handleSave}
          >
            Save
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
};

export default ProfilePhotoCard;
