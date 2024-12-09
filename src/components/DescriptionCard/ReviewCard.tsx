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
import { maskName } from "../../utils/maskName";

interface ReviewCardProps {
  review: Review;
  isProfilePage: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  isProfilePage = false,
}) => {
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
            sx={{ zIndex: 0 }}
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
              {maskName(review.order.employer_name)}
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
          {!isProfilePage && (
            <Typography variant="subtitle1">
              {review.review_for === "worker"
                ? `Client review for ${review.order.worker_job_subtype_name} worker`
                : "Worker review for a client"}
            </Typography>
          )}

          <Typography variant="body1">{review.feedback}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
