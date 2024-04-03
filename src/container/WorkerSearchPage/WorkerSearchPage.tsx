import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StarIcon from '@mui/icons-material/Star';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const WorkerSearchPage: React.FC = () => {

    return (
        <Container
            component='section'

            sx={{
                padding: '30px 0',
                margin: '100px auto'
            }}
        >
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
                    margin: '20px 0',
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
                    <Typography
                        sx={{
                            margin: '5px 0 20px',
                            fontFamily: 'Roboto',
                            fontSize: '10px',
                            fontWeight: '400',
                            color: '#00000099'
                        }}
                    >
                        Choose the city in which you wish to receive service
                    </Typography>
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
                    <Typography
                        sx={{
                            marginTop: '5px',
                            fontFamily: 'Roboto',
                            fontSize: '10px',
                            fontWeight: '400',
                            color: '#00000099'
                        }}
                    >
                        Choose which cleaning type would you like to avail
                    </Typography>
                </FormControl>
            </Box>

            <Box
                sx={{
                    margin: '20px 0',
                    padding: '10px 20px',
                    border: '1px solid #F58A47',
                    borderRadius: '4px'
                }}
            
            >
                <Typography
                    sx={{
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
                        background: '#C5C6D0'
                    }}
                >

                </Box>
            </Box>
            
            
        </Container>

    );
}


export default WorkerSearchPage;