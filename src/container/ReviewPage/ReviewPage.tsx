import {useState, useEffect} from 'react';
import axios from 'axios';
import { Box, Button, Container} from "@mui/material";
import BackNavigation from "../../components/TopNavigation/BackNavigation";
import Reviewee from "../../components/Review/Reviewee";
import StarRate from "../../components/Review/Rating/StarRate";
import ReviewDescription from "../../components/Review/ReviewDescription";
import FileUpload from "../../components/Review/FileUpload/FileUpload";
import './reviewPage.css';


const ReviewPage = () => {
  const [formValues, setFormValues] = useState({
    feedback: "",
    overall_rating: "",
    order_id: "1",
    user_id: "1",
    created_at: new Date(),
    updated_at: new Date(),
    category_flg: "1-reviewForWorker"
  })
  const [feedback, setFeedback] = useState([]);
  // const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  }
  const getFeedback = async() => {
    const response = await axios.get("http://localhost/api/v1/reviews");
    setFeedback(response.data.data);
  }

  // const storeReview = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("feedback", formValues);
  //     getFeedback();
  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost/api/v1/reviews", formValues);
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
      <form className="reviewPageForm">
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
    </Box>
  );
};

export default ReviewPage;