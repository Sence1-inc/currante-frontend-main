import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        padding: "4px 15px",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        zIndex: 1001,
        top: "64px",
        backgroundColor: "background.default",
      }}
    >
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackOutlined />
      </IconButton>
    </Box>
  );
};

export default BackButton;
