import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import ReviewsCard from "../../components/DescriptionCard/ReviewsCard";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { JobType, Review } from "../../redux/type";
import carpenter from "/images/carpenter.png";
import cleaner from "/images/cleaner.png";
import image from "/images/img_services_carpentry_1.jpg";
import plumber from "/images/plumber.png";

const EmployerDashboard = () => {
  const [jobTypes, setJobTypes] = useState<JobType[] | []>([]);
  const [reviews, setReviews] = useState<Review[] | []>([]);

  useEffect(() => {
    const getJobTypes = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/jobtypes");
        const types = response.data.map((type: JobType) => {
          return {
            ...type,
            image:
              type.job_type_name === "Cleaning"
                ? cleaner
                : type.job_type_name === "Carpentry"
                ? carpenter
                : plumber,
          };
        });
        setJobTypes(types);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    const getReviews = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/reviews");
        setReviews(response.data);
      } catch (error) {}
    };

    getReviews();
    getJobTypes();
  }, []);

  return (
    <Box
      sx={{
        marginTop: "64px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minHeight: "calc(100vh - 64px - 84px)",
      }}
    >
      <Box
        sx={{
          height: "180px",
          width: "100%",
          backgroundImage: `url(${image})`,
        }}
      ></Box>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            border: "1px solid #F58A47",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography variant="h6">Services</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", xs: "center" },
              flexWrap: { xs: "wrap", sm: "nowrap" },
              gap: { xs: "10px" },
              width: "100%",
            }}
          >
            {jobTypes.map((service) => {
              return (
                <ServiceCard
                  key={service.job_type_name}
                  id={service.id as number}
                  title={service.job_type_name}
                  image={service.image}
                />
              );
            })}
          </Box>
        </Box>
        <ReviewsCard reviews={reviews as Review[]} isProfilePage={false} />
      </Box>
    </Box>
  );
};

export default EmployerDashboard;
