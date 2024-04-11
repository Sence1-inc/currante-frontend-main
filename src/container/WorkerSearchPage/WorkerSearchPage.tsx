import * as React from "react";
import { Box, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StarIcon from '@mui/icons-material/Star';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import FormHelperText from '@mui/material/FormHelperText';

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '200px',
    borderRadius: '28px'
  }
  const slideImages = [
    {
      url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 1'
    },
    {
      url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
      caption: 'Slide 2'
    },
    {
      url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 3'
    },
  ];

const WorkerSearchPage: React.FC = () => {

    return (
        <Box 
            sx={{ margin: "64px 0", padding: "20px", display: "flex", flexDirection: "column", gap: "20px", }}
        >
            <Box 
                sx={{
                    padding: '20px 0'
                }}
                className="slide-container">
                <Slide>
                {slideImages.map((slideImage, index)=> (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                    </div>
                    ))} 
                </Slide>
            </Box>
            <Box
                sx={{
                    background: '#A1B5DE',
                    padding: '25px 15px',
                    borderRadius: '4px'
                }}
            >
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}

                    sx={{
                        textAlign: 'left'
                    }}
                > 
                    <Typography>
                        <EventNoteIcon
                            sx={{
                                color: '#fff',
                                paddingRight: '10px'
                            }}
                        />
                            Vaccinated workers
                    </Typography>
                    <Typography>
                        <MapsHomeWorkIcon
                            sx={{
                                color: '#fff',
                                paddingRight: '10px'
                            }}
                        />
                        5000+ household served
                    </Typography>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    > 
                    <Typography>
                        <StarIcon
                            sx={{
                                color: '#fff',
                                paddingRight: '10px'
                            }}
                        />
                            4.7 service rating
                    </Typography>
                    <Typography>
                        <CheckCircleIcon
                            sx={{
                                color: '#fff',
                                paddingRight: '10px'
                            }}
                        />
                        Verified workers
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    padding: '10px 20px',
                    border: '1px solid #F58A47',
                    borderRadius: '4px'
                }}
            
            >
                <FormControl fullWidth>
                    <InputLabel variant="outlined" htmlFor="select-area">
                        Select Area
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Area"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText
                        sx={{
                            fontFamily: "Roboto",
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#00000099",
                        }}
                    >
                        Choose the city in which you wish to receive service
                    </FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel variant="outlined" htmlFor="select-cleaning-type">
                        Select cleaning type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Cleaning-Type"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText
                        sx={{
                            fontFamily: "Roboto",
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#00000099",
                        }}
                    >
                        Choose which job type would you like to avail
                    </FormHelperText>
                </FormControl>
            </Box>

            <Box
                sx={{
                    padding: '20px',
                    border: '1px solid #F58A47',
                    borderRadius: '4px',
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}
            
            >
                <Typography
                    sx={{
                        margin: '10px 0 20px',
                        fontSize: '16px',
                        fontWeight: '500'
                    }}
                >
                    Available Cleaners
                </Typography>
                <Box
                    sx={{
                        borderRadius: '12px',
                        padding: '10px 15px',
                        border: '1px solid #C5C6D0'
                    }}
                >
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        flexWrap={'wrap'}
                        width={'100%'}
                    >
                        <img src="../public/images/img_worker_online.png" alt="placeholder" />
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            flexBasis={'100%'}
                            flex={'1'}
                            justifyContent={'space-evenly'}
                            alignItems={'center'}
                            p={'0 0 10px'}
                        >
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                            >
                            Header
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '8px',
                                    fontWeight: '400'
                                }}
                            >
                                #123456
                            </Typography>
                        </Box>

                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            flexBasis={'100%'}
                            flex={'1'}
                            justifyContent={'space-evenly'}
                            alignItems={'center'}
                            p={'0 0 10px'}
                        >
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: '400'
                                }}
                            >
                            Jane Smith
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: '400'
                                }}
                            >
                                Quezon City
                            </Typography>
                        </Box>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            flexBasis={'100%'}
                            flex={'1'}
                            justifyContent={'space-evenly'}
                            alignItems={'center'}
                            p={'0 0 10px'}
                        >
                            <Typography
                                sx={{
                                    fontSize: '8px',
                                    fontWeight: '400'
                                }}
                            >
                            Available schedule
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            
            
        </Box>

    );
}


export default WorkerSearchPage;