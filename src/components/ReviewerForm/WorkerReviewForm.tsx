import { Delete, Clear } from "@mui/icons-material";
import {
  Box,
  ImageList,
  ImageListItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";

interface WorkerReviewFormProps {
  rating: number;
  handleSetRating: (e: React.ChangeEvent<{}>, newValue: number | null) => void;
}

const WorkerReviewForm: React.FC<WorkerReviewFormProps> = ({
  rating,
  handleSetRating,
}) => {
  const [files, setFiles] = useState<FileList | []>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    console.log("uploadedFiles", uploadedFiles);
    if (uploadedFiles && uploadedFiles.length > 0) {
      const previews = Array.from(uploadedFiles).map((file) =>
        URL.createObjectURL(file)
      );
      console.log("THIS", previews);
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

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Typography variant="body1">Rate your employer</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={handleSetRating}
        />
      </Box>
      <Box>
        <Typography variant="body1">Type 200 characters</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Tell us your experience"
        />
      </Box>
      <Box>
        <Typography variant="body1">Upload photos or videos</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            height: "100px",
            margin: "20px 0",
            padding: "20px 0",
            borderWidth: "1px",
            borderColor: "gray",
            borderStyle: "dashed",
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
            // disabled={isUploading}
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
                : "Add more photos"}
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkerReviewForm;
