import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

interface ServiceCardProps {
  title: string;
  image: any;
  id: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, image, id }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "80px",
        height: "auto",
        backgroundColor: "primary.light",
        padding: "8px",
        textAlign: "center",
        borderRadius: "4px",
      }}
      onClick={() => navigate(`/services/${id}/workers`)}
    >
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          width: "100%",
          height: "100px",
          backgroundSize: "cover",
        }}
      ></Box>
      <Typography
        sx={{ color: "primary.main", marginTop: "10px" }}
        variant="body2"
      >
        {title}
      </Typography>
    </Box>
  );
};

export default ServiceCard;
