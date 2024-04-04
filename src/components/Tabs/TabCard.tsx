import React, { useState } from "react";
import { Box, Card, Typography, Button, Modal } from "@mui/material";
import ProfileImage from '../../assets/profile.png'
import QuestionImage from '../../assets/question.png'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from '@mui/icons-material/Check';

interface TabCardProps {
  item: {
    id: string
    status: string
    provider_name: string
  }
}

const TabCard: React.FC<TabCardProps> = ({ item }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const capitalizeFirstLetter = (str: string)  =>{
    return str[0].toUpperCase() + str.slice(1);
  }

  const handleClick = () => {
    console.log('clicked', item.status)
  }

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#faf8ff',
      border: '1px solid #c5c6d0',
      borderRadius: 4,
      paddingTop: 1,
      paddingLeft: 2,
      paddingRight: 2,
      paddingBottom: 2,
      maxWidth: '360px',
      margin: '0 auto',
     }}>
      <Box>
        <Typography sx={{ 
          textAlign: 'right',
          fontSize: 12,
          fontWeight: 'lighter',
          marginBottom: 1,
          color: '#f58a47',
          "@media (max-width:768px)": { 
            fontSize: 8
          }, 
         }}>{ capitalizeFirstLetter(item.status) }</Typography>
      </Box>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 1
       }}>
        <Box sx={{  width: '70px', minWidth: '70px', textAlign: 'center' }}>
        <Box sx={{  marginBottom: '5px' }}><img src={ProfileImage} alt="" /></Box>
          <Typography sx={{ 
            fontSize: 12, 
            fontFamily: 'Poppins', 
            fontWeight: 'regular', 
            color: '#0e2F71', 
            "@media (max-width:768px)": { 
              fontSize: 8
              }, 
            }}>{ item.provider_name }</Typography>
        </Box>
        <Box sx={{  width: '240px',
            "@media (max-width:768px)": { 
              width: '250px'
            },  
          }}>
          <Typography sx={{
            fontSize: 20,
            fontWeight: 600,
            color: '#f58a47',
            fontFamily: 'Poppins',
            marginBottom: 0.5,
            "@media (max-width:768px)": { 
              fontSize: 16
            }, 
          }}>Header</Typography>
          <Typography sx={{ 
            fontSize: 14,
            fontWeight: 600,
            color: '#0e2F71',
            fontFamily: 'Poppins',
            marginBottom: 1,
            "@media (max-width:768px)": { 
              fontSize: 12
            }, 
           }}>Quezon City</Typography>
           <Box>
            <Typography sx={{ 
              fontSize: 12, 
              fontFamily: 'Poppins', 
              fontWeight: 'regular', 
              color: '#0e2F71', 
              "@media (max-width:768px)": { 
                fontSize: 8
              }, 
            }}>Requested on: 03 Jan 2024 10:00</Typography> 
           </Box>
        </Box>
        <Box sx={{  
          minWidth: '50px',
          "@media (max-width:768px)": { 
            minWidth: '34px',
          }, 
        }}>
          <Typography sx={{ 
            fontSize: 12, 
            fontFamily: 'Poppins', 
            fontWeight: 'light', 
            color: '#45464F',
            "@media (max-width:768px)": { 
              fontSize: 8
            }, 
            }}>#{ item.id }</Typography>
        </Box>
      </Box>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
       }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <MyLocationIcon sx={{ color: '#0e2F71', width: 20, height: 20, marginBottom: '5px' }} />
          <Typography sx={{ 
            fontSize: 12, 
            fontFamily: 'Poppins', 
            fontWeight: 'regular', 
            color: '#0e2F71', 
            "@media (max-width:768px)": { 
              fontSize: 8
            }, 
            }}>Arrived at Location</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1  }}>
          <DoneAllIcon sx={{ color: '#0e2F71', width: 20, height: 20, marginBottom: '5px' }} />
          <Typography sx={{ 
            fontSize: 12, 
            fontFamily: 'Poppins', 
            fontWeight: 'regular', 
            color: '#0e2F71', 
            "@media (max-width: 768px)": { 
              fontSize: 8
            }, 
          }}>Work Completed</Typography>
        </Box>
        <Box>
          <Button 
            onClick={handleOpen}
            sx={{ 
              backgroundColor: '#0e2f71',
              color: '#ffffff',
              fontSize: 8,
              fontweight: 'normal',
              "&:hover": { 
                backgroundColor: '#0A204C',
              },
            }}
          >
            <CheckIcon sx={{ 
              color: '#ffffff', 
              width: '14px', 
              height: '12px', 
              marginRight: '3px' 
            }} />
            Accept
           </Button>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ 
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '49%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '275px',
            minHeight: '270px',
            height: 'auto',
            bgcolor: '#e8e7ef',
            borderRadius: '28px',
            boxShadow: 24,
          }}>
          <Box
            sx={{ 
              padding: '24px',
              paddingBottom: 0
             }}  
          >
            <Box
              sx={{ 
                textAlign: 'center'
                }} 
            >
              <img src={QuestionImage} alt="" />
            </Box>
            <Typography 
              sx={{ 
                fontSize: 16,
                fontWeight: 600,
                color: '#1A1B21',
                textAlign: 'center',
                fontFamily: 'Poppins',
                marginBottom: '10px'
              }}
            >Accept work?</Typography>
            <Typography 
              sx={{ 
                fontSize: 14,
                fontWeight: 400,
                color: '#45464F',
                textAlign: 'left',
                fontFamily: 'Poppins',
                marginBottom: '14px'
              }}
            >You are about to accept house cleaning work from {item.provider_name}.</Typography>
            <Typography
              sx={{ 
                fontSize: 14,
                fontWeight: 600,
                color: '#45464F',
                textAlign: 'left',
                fontFamily: 'Poppins',
                marginBottom: '2px'
              }}
            >Work information:</Typography>
            <Typography
              sx={{ 
                fontSize: 14,
                fontWeight: 400,
                color: '#45464F',
                textAlign: 'left',
                fontFamily: 'Poppins',
                marginBottom: '2px'
              }}
            ><Typography sx={{ fontWeight: 600, display: 'inline'}}>Location:</Typography> Quezon City</Typography>
            <Typography
              sx={{ 
                fontSize: 14,
                fontWeight: 400,
                color: '#45464F',
                textAlign: 'left',
                fontFamily: 'Poppins',
                marginBottom: '2px'
              }}
            ><Typography sx={{ fontWeight: 600, display: 'inline'}}>Time:</Typography> Feb. 10 7am-12pm</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '24px', paddingTop: '10px', paddingBottom: '10px', gap: '10px' }}>
            <Button
              onClick={handleClose}
              sx={{ 
                backgroundColor: 'transparent',
                color: '#0E2F71',
                fontSize: 12,
                fontweight: 'normal',
                fontFamily: 'Poppins',
                "&:hover": { 
                  backgroundColor: '#cccccc',
                },
              }}
            >Rethink</Button>
            <Button
              onClick={handleClick}
              sx={{ 
                backgroundColor: '#0e2f71',
                color: '#ffffff',
                fontSize: 12,
                fontweight: 'normal',
                fontFamily: 'Poppins',
                "&:hover": { 
                  backgroundColor: '#0A204C',
                },
              }}
            >Accept</Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  )
}

export default TabCard;