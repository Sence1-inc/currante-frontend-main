import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { Review } from "../../redux/type";
import ReviewCard from "./ReviewCard";

interface ReviewsCardProps {
  reviews: Review[];
}

const ReviewsCard: React.FC<ReviewsCardProps> = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 1;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <Box
      sx={{
        padding: "20px",
        border: "1px solid #F58A47",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h6">Reviews</Typography>
      {currentReviews.map((review: Review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      {currentReviews.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
          }}
        >
          <IconButton
            color="primary"
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <Typography>
            {currentPage} of {totalPages}
          </Typography>
          <IconButton
            color="primary"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Typography variant="body1">No reviews found</Typography>
      )}
    </Box>
  );
};

export default ReviewsCard;
