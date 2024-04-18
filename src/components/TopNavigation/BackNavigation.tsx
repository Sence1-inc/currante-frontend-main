import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import arrBack from "../../../public/images/arr_back.svg";
import BackWarning from '../Modals/BackWarning';

export default function BackNavigation() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Box sx={{
      display: "flex",
      gap: "10px",
      borderBottom: "1px solid #FAF8FF",  
      padding: "15px 0px",
      boxSizing: "border-box",
      alignItems: "center"
    }}>
      <Button sx={{
        border: "none",
        background: "transparent",
        alignItems: "center",
        justifySelf: "center",
        display: "flex",
        minWidth: "30px"
      }} onClick={() => setShowLogin(true)}><img src={arrBack} alt=""/></Button>
      <Typography variant="titleMed">Write a review</Typography>
      <BackWarning  show={showLogin} close={() => setShowLogin(false)} />
    </Box>
  );
}
