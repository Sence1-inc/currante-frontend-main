import { Box, Container, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';

export default function ReviewDescription({name, value, handleChange}) {
    return (
        <Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px" }}
            >
                <Typography variant='labelLight'>Review comment</Typography>
                <Typography variant='smallest' color='secondary.main' sx={{marginLeft: "10px"}}>Required to receive payment</Typography>
            </Box>
            <TextField 
                name={name} 
                value={value} 
                onChange={handleChange} 
                placeholder="Enter comment here..." 
                size="large"
                rows={3}
                inputProps={{ maxLength: 500 }}
                multiline 
                fullWidth 
                required
            />
        </Box>
    )
}
