import { Box, Container, Typography } from '@mui/material';
import starFilled from '../../../../public/images/icon_star_filled.svg';
import starBorder from '../../../../public/images/icon_star_border.svg';

export default function Rating() {
  return (
    <Box sx={{display: "flex", alignItems:"center", gap:"15px"}}>
        <Typography variant='labelLight'>Rate your employer</Typography>
        <Box sx={{display: "flex"}}>
            <img src={starBorder} alt="" />
            <img src={starBorder} alt="" />
            <img src={starBorder} alt="" />
            <img src={starBorder} alt="" />
            <img src={starBorder} alt="" />
        </Box>
    </Box>
  );
}

