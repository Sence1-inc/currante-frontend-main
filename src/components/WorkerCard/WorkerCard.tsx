import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface WorkerCardProps {
  handleCardClick: () => void;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ handleCardClick }) => {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "12px",
        padding: "0 16px",
        height: "auto",
        border: "1px #C5C6D0 solid",
        boxShadow: "none",
        backgroundColor: "#FAF8FF",
      }}
      onClick={handleCardClick}
    >
      <Avatar
        sx={{ width: "40px", height: "40px", alignSelf: "center" }}
        src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h6">Header</Typography>
          <Typography variant="subtitle1">#123456</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="body2">Jane Doe Smith</Typography>
          <Typography variant="body2">&#x2022;</Typography>
          <Typography variant="body2">Pasig City</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">starts at P 500</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkerCard;