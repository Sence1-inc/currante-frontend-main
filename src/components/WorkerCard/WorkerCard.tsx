import { CheckCircle } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

interface WorkerCardProps {
  handleCardClick: () => void;
  name: string;
  types: string[];
  price: string;
  isIdentificationVerified: boolean;
  avatar: string;
}

const WorkerCard: React.FC<WorkerCardProps> = ({
  handleCardClick,
  name,
  types,
  price,
  isIdentificationVerified,
  avatar,
}) => {
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
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          isIdentificationVerified ? <CheckCircle color="success" /> : <></>
        }
      >
        <Avatar
          sx={{ width: "40px", height: "40px", alignSelf: "center" }}
          src={avatar}
        />
      </Badge>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h6">{name}</Typography>
          {/* <Typography variant="subtitle1">#123456</Typography> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {/* <Typography variant="body1">{name}</Typography> */}
          {types.length > 0 && (
            <>
              {/* <Typography variant="body1">&#x2022;</Typography> */}
              <Typography variant="body1">starts at P {price}</Typography>
            </>
          )}
        </Box>
        <Box>
          <Typography variant="subtitle1">{types.join(", ")}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkerCard;
