import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router";
import axiosInstance from "../../../axiosInstance";
import DescriptionCard from "../../components/DescriptionCard/DescriptionCard";
import ReviewCard from "../../components/DescriptionCard/ReviewCard";
import { Worker } from "../../redux/type";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "200px",
  borderRadius: "28px",
};
const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 1",
  },
  {
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "Slide 2",
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 3",
  },
];

const ProfileViewPage: React.FC = () => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const getWorker = async () => {
      const response = await axiosInstance.get(`/api/v1/workers/${id}`);
      setWorker(response.data);
    };

    getWorker();
  }, []);
  return (
    <Box
      sx={{
        margin: "64px 0",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          padding: "20px 0",
        }}
        className="slide-container"
      >
        <Carousel>
          {slideImages.map((slideImage, index) => (
            <Box key={index}>
              <Box
                sx={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              >
                <span style={spanStyle}>{slideImage.caption}</span>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>
      <DescriptionCard
        image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        title={`${worker?.profile.first_name} ${worker?.profile.last_name}`}
        description={worker?.profile.description as string}
      />
      <DescriptionCard
        title="Work Details"
        description="Thorough cleaning of all rooms, including dusting, vacuuming, and
          mopping floors Cleaning and sanitizing bathrooms, including toilets,
          sinks, showers, and tubs Wiping down kitchen surfaces, including
          countertops, appliances, and cabinet fronts Cleaning interior windows,
          mirrors, and glass surfaces Dusting and wiping down baseboards, light
          fixtures, and ceiling fans Emptying trash bins and replacing liners
          Making beds and changing linens Organizing and tidying up living
          spaces Additional tasks upon request, such as laundry, dishwashing, or
          pet care"
      />
      <DescriptionCard
        title="Pricing"
        description="
          General Cleaning Package Php 40 per sqm.
          Deep Cleaning Package Php 50 per sqm."
      />
      <DescriptionCard
        title="Business Hours"
        description="Monday to Sunday 8am - 10pm"
      />
      <ReviewCard />
    </Box>
  );
};

export default ProfileViewPage;
