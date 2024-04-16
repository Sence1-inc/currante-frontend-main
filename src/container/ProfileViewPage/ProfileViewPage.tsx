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

  const renderPrices = () => {
    const jobs = worker?.profile.job_subtypes.filter((type) => type.active_flg);

    let formattedJobs: string[] = [];

    jobs?.forEach((job) => {
      formattedJobs.push(`${job.job_name}: ${job.job_unit_price} ${job.unit}`);
    });

    return formattedJobs.join(", ");
  };

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
        description={worker?.work_details as string}
      />
      <DescriptionCard title="Pricing" description={renderPrices()} />
      <DescriptionCard
        title="Business Hours"
        description={worker?.profile.schedule as string}
      />
      <ReviewCard />
    </Box>
  );
};

export default ProfileViewPage;
