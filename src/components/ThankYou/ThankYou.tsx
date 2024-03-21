import { Box, Typography } from "@mui/material";

const ThankYou = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Thank you for subscribing to our newsletter
      </Typography>
    </Box>
  );
};

export default ThankYou;
