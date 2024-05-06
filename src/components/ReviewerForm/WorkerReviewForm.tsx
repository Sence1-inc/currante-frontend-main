import { Clear } from "@mui/icons-material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import CustomRating from "./CustomRating";

interface WorkerReviewFormProps {
  handleSetIsWorkerSuccessModalOpen: (value: boolean) => void;
}

const WorkerReviewForm: React.FC<WorkerReviewFormProps> = ({
  handleSetIsWorkerSuccessModalOpen,
}) => {
  const [files, setFiles] = useState<FileList | []>([]);
  const maxFileSizeMB = 10;
  const order = useAppSelector((state) => state.order);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [overallRating, setOverallRating] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbar] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;

    if (uploadedFiles && uploadedFiles.length > 0) {
      const filesArray = Array.from(uploadedFiles);
      const previews = filesArray.map((file) => URL.createObjectURL(file));

      const fileSizeExceedsLimit = filesArray.some(
        (file) => file.size > maxFileSizeMB * 1024 * 1024
      );

      if (fileSizeExceedsLimit) {
        alert(
          `One or more files exceed the maximum size of ${maxFileSizeMB} MB`
        );
        return;
      }

      setPreviewImages(previews);
      setFiles(uploadedFiles);
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
  };

  const handleSubmit = async () => {
    try {
      const data = {
        feedback: feedback,
        overall_rating: overallRating,
        order_id: order.id,
        user_id: user.id,
        review_for: "employer",
        reviewee_id: order.employer_user_id,
      };
      setIsUploading(true);
      const response = await axiosInstance.post("/api/v1/reviews", data);
      if (response.status === 201) {
        const res = await axiosInstance.patch(`/api/v1/orders/${order.id}`, {
          status: "5",
        });

        if (res.status === 201) {
          setIsUploading(false);
          dispatch(initializeUser({ ...user, orders: res.data.orders }));
          handleSetIsWorkerSuccessModalOpen(true);
          setIsSnackbar(false);
          setErrorMessage("");
        }
      }
    } catch (error: any) {
      setIsUploading(false);
      setIsSnackbar(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <CustomRating
        handleSetRating={(value) => setOverallRating(value)}
        rating={overallRating}
        title="Rate your employer"
      />
      {/* <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Typography variant="body1">Rate your employer</Typography>
        <Rating
          name="simple-controlled"
          value={overallRating}
          onChange={(event, newValue) => {
            console.log(event);
            setOverallRating(newValue as number);
          }}
        />
      </Box> */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="body1">Type 200 characters</Typography>
        <TextField
          value={feedback}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFeedback(e.target.value)
          }
          fullWidth
          multiline
          rows={4}
          placeholder="Tell us your experience"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="body1">Upload photos</Typography>
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
              <FileUploadIcon
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
      </Box>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <CustomSnackbar
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbar(value)}
      />
    </Box>
  );
};

export default WorkerReviewForm;
