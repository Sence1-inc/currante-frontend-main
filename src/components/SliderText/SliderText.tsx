import { Box, Container, Typography } from "@mui/material";


  
const SliderText: React.FC = () => {
   


  return(
    <Typography
            variant="h1"
            className="headingText" 
            sx={{
              textAlign: { md: "left", xs: "center" },
              color: "primary.main",
              whiteSpace: "pre-wrap",
              fontFamily: "Open Sans",
              fontSize: "27px",
              lineHeight: 1.5,
              mb: 4,
            }}
          >

            {headingText}
          </Typography>
  );  
};

export default SliderText;