import { Avatar, Box, Rating, Typography } from "@mui/material";
import React from "react";
import { Employer, Worker } from "../../redux/type";

interface RevieweeProfileCardProps {
  reviewee: Worker | Employer | null;
}

const RevieweeProfileCard: React.FC<RevieweeProfileCardProps> = ({
  reviewee,
}) => {
  return (
    <Box
      sx={{
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          padding: "10px 0",
        }}
      >
        <Avatar
          sx={{ width: "80px", height: "80px", alignSelf: "center" }}
          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2">
            {reviewee?.profile.first_name} {reviewee?.profile.middle_name}
            {reviewee?.profile.last_name}
          </Typography>
          <Typography variant="body1">description</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2">Overall rating</Typography>
        <Rating
          precision={0.5}
          size="small"
          name="read-only"
          value={Number(reviewee?.profile.overall_rating)}
          readOnly
        />
      </Box>
    </Box>
  );
};

export default RevieweeProfileCard;
