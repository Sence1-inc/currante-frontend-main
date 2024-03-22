import React, { useState } from "react";
import { Box, List, ListItem, Card, Typography, Button } from "@mui/material";
import { TabsContainer, TabsItem, TabsMenu } from '../../components/Tabs/Tabs';
import ProfileImage from '../../assets/profile.png'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DoneAllIcon from '@mui/icons-material/DoneAll';



const JobListPage: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Box sx={{marginTop: "64px"}}>
        <Box sx={{ backgroundColor: '#d7e3ff' }}> 
          <TabsContainer
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <TabsMenu label="All" />
            <TabsMenu label="Incoming" />
            <TabsMenu label="Current" />
            <TabsMenu label="Completed" />
          </TabsContainer>
        </Box>
        <TabsItem value={value} index={0}>
          <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#faf8ff',
            borderWidth: 1,
            borderColor: '#c5c6d0',
            borderRadius: 4,
            padding: 2,
           }}>
            <Box>
              <Typography>Incoming</Typography>
            </Box>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'row',
              marginTop: 2,
              gap: 1
             }}>
              <Box sx={{  maxWidth: '30%', minWidth: '50px', textAlign: 'center' }}>
                <img src={ProfileImage} alt="" />
                <Typography sx={{ fontSize: 8, fontFamily: 'Poppins', fontWeight: 'regular', color: '#0e2F71', "@media (max-width:768px)": { fontSize: "0.750rem" }, }}>Jane Smith</Typography>
              </Box>
              <Box sx={{  maxWidth: '50%' }}>
                <Typography sx={{ 
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#f58a47',
                  fontFamily: 'Poppins'
                }}>Header</Typography>
                <Typography sx={{ 
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#0e2F71',
                  fontFamily: 'Poppins'
                 }}>Quezon City</Typography>
                <Typography sx={{ fontSize: 8, fontFamily: 'Poppins', fontWeight: 'regular', color: '#0e2F71', "@media (max-width:768px)": { fontSize: "0.750rem" }, }}>Requested on: 03 Jan 2024 10:00</Typography>
              </Box>
              <Box>
                  <Typography sx={{ fontSize: 8, fontFamily: 'Poppins', fontWeight: 'light', color: '#5464f' }}>#123456</Typography>
                </Box>
            </Box>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 2,
             }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <MyLocationIcon />
                <Typography sx={{ fontSize: 6, fontFamily: 'Poppins', fontWeight: 'regular', color: '#0e2F71', "@media (max-width:768px)": { fontSize: "0.750rem" }, }}>Arrived at Location</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1  }}>
                <DoneAllIcon />
                <Typography sx={{ fontSize: 6, fontFamily: 'Poppins', fontWeight: 'regular', color: '#0e2F71', "@media (max-width:768px)": { fontSize: "0.750rem" }, }}>Work Completed</Typography>
              </Box>
              <Box>
                <Button>Accept</Button>
                {/* <Button>Review</Button> */}
              </Box>
            </Box>
          </Card>
        </TabsItem>
        <TabsItem value={value} index={1}>
          Item Two
        </TabsItem>
        <TabsItem value={value} index={2}>
            Item Three
        </TabsItem>
        <TabsItem value={value} index={3}>
            Item Four
        </TabsItem>
      </Box>
    );
  };
  
  export default JobListPage;