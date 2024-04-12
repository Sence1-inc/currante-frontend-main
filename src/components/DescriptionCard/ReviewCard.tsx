import { Box, Typography } from "@mui/material";

const ReviewCard = () => {
  return (
    <Box
      sx={{
        padding: "10px 20px",
        border: "1px solid #F58A47",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h6">Reviews</Typography>
    </Box>
  );
};

export default ReviewCard;
