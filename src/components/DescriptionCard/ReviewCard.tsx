import { CheckCircle } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Review } from "../../redux/type";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        height: "auto",
        border: "1px #C5C6D0 solid",
        boxShadow: "none",
        backgroundColor: "common.white",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            padding: "10px 0",
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              review.order.is_employer_identification_verified ? (
                <CheckCircle color="success" />
              ) : (
                <></>
              )
            }
          >
            <Avatar
              sx={{ width: "40px", height: "40px", alignSelf: "center" }}
              src={review.order.employer_avatar_photo}
            />
          </Badge>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="body2">
              {review.order.employer_name}
            </Typography>
            <Rating
              size="small"
              name="read-only"
              value={review.overall_rating}
              readOnly
            />
          </Box>
        </Box>
        <Box
          sx={{
            paddingTop: "10px",
            alignSelf: "flex-start",
          }}
        >
          <Typography variant="body1">{review.feedback}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
