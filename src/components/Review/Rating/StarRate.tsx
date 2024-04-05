import { Box, Typography, Rating } from '@mui/material';

export default function StarRate({title}) {
  return (
    <Box sx={{display: "flex", alignItems:"center", gap:"15px"}}>
      <Typography variant='labelLight'>{title}</Typography>
      <Rating name="customized-5" defaultValue={0} max={5} />
    </Box>
  );
}

