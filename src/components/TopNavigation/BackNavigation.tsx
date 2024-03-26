import { Box, Typography } from '@mui/material';
import arrBack from "../../../public/images/arr_back.svg";


export default function BackNavigation() {
  return (
    <Box sx={{
      display: "flex",
      gap: "10px",
      borderBottom: "1px solid #FAF8FF",  
      padding: "15px 0px",
      boxSizing: "border-box"
    }}>
      <img src={arrBack} alt=""/>
      <Typography variant="titleMed">Write a review</Typography>
    </Box>
  );
}
