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
import imageCompression from "browser-image-compression";
import React, { ChangeEvent, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axiosInstance from "../../../axiosInstance";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch } from "../../redux/store";
import { User } from "../../redux/type";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
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
  const MAX_FILES = 6;
  const maxFileSizeMB = 3;
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | []>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [presignedUrls, setPresignedUrls] = useState<string[] | []>([]);
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (user.covers.length > 0) {
      setPreviewImages(user.covers);
    }
  }, []);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // setIsUploading(true);
    const uploadedFiles = event.target.files;
    console.log(previewImages);
    if (uploadedFiles && uploadedFiles.length > 0) {
      if (previewImages.length > MAX_FILES) {
        setIsUploading(false);
        setSuccessMessage("");
        setIsSnackbarOpen(true);
        setErrorMessage(`You can only upload up to ${MAX_FILES} files.`);
        return;
      }

      const filesArray = Array.from(uploadedFiles);
      const previews = [];
      const urls = [];

      const fileSizeExceedsLimit = filesArray.some(
        (file) => file.size > maxFileSizeMB * 1024 * 1024
      );

      if (fileSizeExceedsLimit) {
        setIsUploading(false);
        setSuccessMessage("");
        setIsSnackbarOpen(true);
        setErrorMessage(
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

      const fileList = new DataTransfer();
      filesArray.forEach((file) => fileList.items.add(file));
      const newFileList = fileList.files;

      setIsUploading(false);
      setPreviewImages([...previewImages, ...previews]);
      setFiles(newFileList);
      setPresignedUrls([...presignedUrls, ...urls]);
    }
  };

  const handleDeleteCoverPhoto = async (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      const filename = pathname.split("/").pop();

      const response = await axiosInstance.delete(`/api/v1/photo/${filename}`);
      dispatch(initializeUser({ ...user, covers: response.data.covers }));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(previewImages);
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

    handleDeleteCoverPhoto(previewImages[index]);
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

      setSuccessMessage("Photo/s successfully uploaded");
      setIsSnackbarOpen(true);
      setErrorMessage("");
    } catch (error: any) {
      console.error("Error saving photos: ", error);
      setSuccessMessage("");
      setIsSnackbarOpen(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleUploadCoverPhotos = async () => {
    try {
      const filesArray = Array.from(files);

      const compressedFiles = await Promise.all(
        filesArray.map((file: File) =>
          imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          })
        )
      );

      await Promise.all(
        presignedUrls.map((presignedUrl, index) =>
          axios.put(presignedUrl, compressedFiles[index], {
            headers: {
              "Content-Type": compressedFiles[index].type,
            },
          })
        )
      );

      savePhotos();
    } catch (error: any) {
      console.error("Error uploading cover photos: ", error);
      setSuccessMessage("");
      setIsSnackbarOpen(true);
      setErrorMessage(error.response.data.message);
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
        <CustomSnackbar
          errorMessage={errorMessage}
          successMessage={successMessage}
          isSnackbarOpen={isSnackbarOpen}
          handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
        />
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "80vw",
            }}
          >
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
                disabled={previewImages?.length >= 6 || isUploading}
              />
              {previewImages.length === 0 ? (
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
                  {previewImages?.length === 0
                    ? "Click here to upload media"
                    : previewImages?.length === 6
                    ? "You've reached the maximum number of uploads"
                    : "Add more photos"}
                </span>
              </Typography>
            </Box>
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

              {/* <Button variant="contained" onClick={handleUpload}>
                Upload Profile Photo
              </Button> */}
            </label>
          </div>
        </Box>
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

        <Typography>{`(${Number(user?.overall_rating).toFixed(
          2
        )} stars)`}</Typography>
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
            {errorMessages?.description && (
              <Typography color="error">
                {errorMessages?.description}
              </Typography>
            )}
          </>
        ) : (
          <TextField
            placeholder="e.g. Enjoy a pristine home with my expert cleaning services, ensuring every corner sparkles with freshness!"
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
            helperText={errorMessages?.description}
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
            onClick={() => {
              const hasFiles = files.length > 0;
              const hasAvatarImage = Boolean(avatarImage?.trim());
              const hasDescription = Boolean(description?.trim());

              if (hasFiles && hasAvatarImage) {
                handleUploadCoverPhotos();
                handleUpload();
              } else if (hasFiles) {
                handleUploadCoverPhotos();
              } else if (hasAvatarImage) {
                handleUpload();
              }

              if (hasDescription) {
                handleSave();
              }
            }}
          >
            {description && (files.length > 0 || avatarImage)
              ? "Save & Upload"
              : files.length > 0 || avatarImage
              ? "Upload"
              : "Save"}
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
};

export default ProfilePhotoCard;
