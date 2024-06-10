import { CameraAlt, CheckCircle, Clear, FileUpload } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ImageList,
  ImageListItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axiosInstance from "../../../axiosInstance";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch } from "../../redux/store";
import { User } from "../../redux/type";
import { isEmptyObject } from "./ProfileBasicInfoCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

interface ProfilePhotoCardProps {
  getPresignedURL: (file: File) => void;
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
  getPresignedURL,
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
  const maxFileSizeMB = 10;
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | []>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [presignedUrls, setPresignedUrls] = useState<string[] | []>([]);
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;

    if (uploadedFiles && uploadedFiles.length > 0) {
      const filesArray = Array.from(uploadedFiles);
      const previews = [];
      const urls = [];

      const fileSizeExceedsLimit = filesArray.some(
        (file) => file.size > maxFileSizeMB * 1024 * 1024
      );

      if (fileSizeExceedsLimit) {
        alert(
          `One or more files exceed the maximum size of ${maxFileSizeMB} MB`
        );
        return;
      }

      for (const file of filesArray) {
        const response = await axiosInstance.get("/api/v1/presigned-url", {
          params: {
            filename: `${file?.name}-${file?.lastModified}`,
            filetype: file?.type,
          },
        });
        urls.push(response.data.url);
        previews.push(URL.createObjectURL(file));
      }

      setPreviewImages(previews);
      setFiles(uploadedFiles);
      setPresignedUrls(urls);
    }
  };

  const handleDeleteFile = async (index: number) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);

    const fileList = new DataTransfer();
    updatedFiles.forEach((file) => fileList.items.add(file));
    setFiles(fileList.files);

    const updatedPresignedUrls = [...presignedUrls];
    updatedPresignedUrls.splice(index, 1);
    setPresignedUrls(updatedPresignedUrls);
  };

  const savePhotos = async () => {
    try {
      const filesArray = Array.from(files);
      await Promise.all(
        filesArray.map(async (file) => {
          const response = await axiosInstance.post("/api/v1/upload", {
            id: user.id,
            filename: `${file?.name}-${file?.lastModified}`,
            type: "cover",
          });
          setFiles([]);
          dispatch(initializeUser({ ...user, covers: response.data.covers }));
        })
      );
    } catch (error) {
      console.error("Error saving photos: ", error);
    }
  };

  const handleUploadCoverPhotos = async () => {
    try {
      await Promise.all(
        presignedUrls.map((presignedUrl, index) =>
          axios.put(presignedUrl, files[index], {
            headers: {
              "Content-Type": files[index].type,
            },
          })
        )
      );

      savePhotos();
    } catch (error) {
      console.error("Error uploading cover photos: ", error);
    }
  };

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
          zIndex: 20,
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
      {user.covers.length > 0 && edittingSection !== sectionName && (
        <Box sx={{ width: "90vw", height: "200px" }}>
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {user.covers.map((cover, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundSize: "cover",
                    height: "200px",
                    borderRadius: "4px",
                    backgroundImage: `url(${cover})`,
                  }}
                />
              </Box>
            ))}
          </Carousel>
        </Box>
      )}
      {edittingSection === sectionName ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "80vw",
            }}
          >
            <Typography variant="body1">Upload cover photos</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                height: "auto",
                padding: "20px 0",
                border: "1px dashed gray",
                borderRadius: "16px",
                background: "#fff",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                "& input": {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                },
              }}
            >
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                disabled={files?.length === 6 || isUploading}
              />
              {files.length === 0 ? (
                <Box
                  sx={{
                    width: "100px",
                    height: "50px",
                    borderRadius: 50,
                    backgroundColor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileUpload
                    fontSize="medium"
                    sx={{ color: "primary.main" }}
                  />
                </Box>
              ) : (
                <ImageList
                  sx={{ width: "100%", height: "100%" }}
                  cols={3}
                  rowHeight={80}
                >
                  {previewImages.map((item, index) => {
                    return (
                      <ImageListItem sx={{ height: "auto" }} key={index}>
                        <Box>
                          <img src={item} loading="lazy" width={60} />
                          <Clear
                            sx={{
                              position: "absolute",
                              top: "0",
                              right: "14px",
                              background: "#fff",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDeleteFile(index)}
                          />
                        </Box>
                      </ImageListItem>
                    );
                  })}
                </ImageList>
              )}
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  color: "primary.main",
                }}
              >
                <span>
                  {files?.length === 0
                    ? "Click here to upload media"
                    : files?.length === 6
                    ? "You've reached the maximum number of uploads"
                    : "Add more photos"}
                </span>
              </Typography>
            </Box>
            <Button variant="contained" onClick={handleUploadCoverPhotos}>
              Upload cover photos
            </Button>
          </Box>
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
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  user.is_identification_verified ? (
                    <CheckCircle color="success" />
                  ) : (
                    <></>
                  )
                }
              >
                <Avatar
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  src={!isHovered ? (avatarImage as string) : undefined}
                  sx={{
                    border: "1px solid #F58A47",
                    borderRadius: "90px",
                    width: "90px",
                    height: "90px",
                    padding: "10px",
                    backgroundColor: "background.default",
                    color: "primary.main",
                  }}
                  alt={user.first_name}
                >
                  {isHovered ? (
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
                        Click to choose
                      </Typography>
                    </Box>
                  ) : null}
                </Avatar>
              </Badge>

              <Button variant="contained" onClick={handleUpload}>
                Upload Profile Photo
              </Button>
            </label>
          </div>
        </>
      ) : user.id_photo ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            user.is_identification_verified ? (
              <CheckCircle color="success" />
            ) : (
              <></>
            )
          }
        >
          <Avatar
            src={user.id_photo}
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
        </Badge>
      ) : (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            user.is_identification_verified ? (
              <CheckCircle color="success" />
            ) : (
              <></>
            )
          }
        >
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
        </Badge>
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
