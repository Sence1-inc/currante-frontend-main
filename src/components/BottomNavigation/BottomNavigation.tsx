import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { MapsHomeWorkRounded } from '@mui/icons-material';
import ChatBubble from '@mui/icons-material/ChatBubble';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, left: 0, right: 0}} >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: "#A1B5DE"
        }}
      >
        <BottomNavigationAction label="Job List" icon={<MapsHomeWorkRounded/>} 
          sx={{
            color: "#FFFFFF !important",
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "12px",
            letterSpacing: "0.5px",
            transition: "unset"
          }}/>
        <BottomNavigationAction label="Messages" icon={<ChatBubbleIcon/>} 
          sx={{
            color: "#FFFFFF !important",
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "12px",
            letterSpacing: "0.5px",
            transition: "unset"
          }}/>
      </ BottomNavigation>
    </Box>
  );
}
