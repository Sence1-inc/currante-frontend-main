import { Box, Typography } from "@mui/material";
import React from "react";

interface PaymentCardProps {
  children: React.ReactNode;
  title: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ children, title }) => {
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
      <Typography variant="body2">{title}</Typography>
      {children}
    </Box>
  );
};

export default PaymentCard;
