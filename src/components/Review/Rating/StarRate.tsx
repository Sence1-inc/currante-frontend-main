import { Box, Typography, Rating } from '@mui/material';

export default function StarRate({title, name, value, handleChange}:any) {
  return (
    <Box sx={{display: "flex", alignItems:"center", gap:"15px"}}>
      <Typography variant='labelLight'>{title}</Typography>
      <Rating name={name} value={value} onChange={handleChange} defaultValue={0} max={5} />
    </Box>
  );
}

