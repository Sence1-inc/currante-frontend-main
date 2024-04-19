import {useState, useEffect} from 'react';
import axios from 'axios';
import { Box, Button, Container} from "@mui/material";
import BackNavigation from "../../components/TopNavigation/BackNavigation";
import Reviewee from "../../components/Review/Reviewee";
import StarRate from "../../components/Review/Rating/StarRate";
import ReviewDescription from "../../components/Review/ReviewDescription";
import FileUpload from "../../components/Review/FileUpload/FileUpload";
import './reviewPage.css';
import SuccessfulReview from '../../components/Modals/SuccessfulReview';


const ReviewPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [formValues, setFormValues] = useState({
    feedback: "",
    overall_rating: null,
    order_id: "1", // to be updated
    user_id: "1", // to be updated
    created_at: new Date(),
    updated_at: new Date(),
    category_flg: "1-reviewForWorker"  // to be updated
  })
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState([]);


  const handleChange = (e:any) => {
    const { name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  }
  const getFeedback = async() => {
    const response = await axios.get("http://localhost/api/v1/reviews");
    setFeedback(response.data.data);
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost/api/v1/reviews", formValues)
      console.log("THIS", response);
      if (response.data) {
        setShowLogin(true)
        console.log("Profile details successfully saved!");
      }
    } catch (e:any) {
      setShowLogin(false);
      setError(e.response.data.errors);  // to be updated
    }
  };
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
      <form className="reviewPageForm" name="reviewPageForm">
        <Container>
          <Box sx={{padding: "15px 0px", display: "flex", gap:"10px", flexDirection:"column"}}>
            <StarRate title="Rate your employer" name="overall_rating" value={formValues["overall_rating"]} handleChange={handleChange} />
            <ReviewDescription name="feedback" value={formValues["feedback"]} handleChange={handleChange} />
            <FileUpload />
          </Box>
        </Container>
        <Button variant="contained" fullWidth sx={{
          padding:"10px 0px",
          borderRadius: "0px",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        }}
        type="submit" onClick={handleSubmit}>Submit</Button>
      </form>
        <SuccessfulReview show={showLogin} close={() => setShowLogin(false)}/>
    </Box>
  );
};

export default ReviewPage;