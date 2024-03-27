import { Box, Button, Container} from "@mui/material";
import BackNavigation from "../../components/TopNavigation/BackNavigation";
import Reviewee from "../../components/Review/Reviewee";
import Rating from "../../components/Review/Rating/Rating";
import ReviewDescription from "../../components/Review/ReviewDescription";
import FileUpload from "../../components/Review/FileUpload/FileUpload";



const ReviewPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignContent: "center",
        alignItems: "center",
        margin: "65px auto 80px",
        textAlign: "center",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.28)",
        boxSizing: "border-box"
      }}
    >
      <Container>
        <BackNavigation />
      </Container>
      <Container sx={{padding:"0px !important"}}>
        <Reviewee />
      </Container>
      <Container>
        <Box sx={{padding: "15px 0px", display: "flex", gap:"10px", flexDirection:"column"}}>
          <Rating />
          <ReviewDescription />
          <FileUpload />
        </Box>
      </Container>
      <Button variant="contained" fullWidth sx={{
        padding:"10px 0px",
        borderRadius: "0px",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
      }}>Submit</Button>
    </Box>
  );
};

export default ReviewPage;
