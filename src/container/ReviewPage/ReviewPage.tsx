import { Box, Button, Container} from "@mui/material";
import BackNavigation from "../../components/TopNavigation/BackNavigation";
import Reviewee from "../../components/Review/Reviewee";
import StarRate from "../../components/Review/Rating/StarRate";
import ReviewDescription from "../../components/Review/ReviewDescription";
import FileUpload from "../../components/Review/FileUpload/FileUpload";
import './reviewPage.css';



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
      <form className="reviewPageForm">
        <Container>
          <Box sx={{padding: "15px 0px", display: "flex", gap:"10px", flexDirection:"column"}}>
            <StarRate title="Rate your employer" />
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
      </form>
    </Box>
  );
};

export default ReviewPage;
