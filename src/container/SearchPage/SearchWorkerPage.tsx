import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import StarIcon from "@mui/icons-material/Star";
import { Box, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router";
import WorkerCard from "../../components/WorkerCard/WorkerCard";
import useGetWorkers from "../../hooks/useGetWorkers";
import { useAppSelector } from "../../redux/store";
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

const SearchWorkerPage: React.FC = () => {
  const navigate = useNavigate();
  const { getWorkers } = useGetWorkers();
  const workers = useAppSelector((state) => state.workers);

  useEffect(() => {
    getWorkers();
  }, []);

  const renderTypes = (worker: Worker) => {
    const jobs = worker?.profile.job_subtypes.filter((type) => type.active_flg);

    let formattedJobs: string[] = [];

    jobs?.forEach((job) => {
      formattedJobs.push(job.job_name);
    });

    return formattedJobs;
  };

  const renderStartPrice = (worker: Worker) => {
    const activeJobs = worker?.profile.job_subtypes.filter(
      (type) => type.active_flg
    );
    return Math.min(...activeJobs.map((job) => job.job_unit_price)).toString();
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
      <Box
        sx={{
          background: "#A1B5DE",
          padding: "20px 10px",
          borderRadius: "4px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          sx={{
            textAlign: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <EventNoteIcon
              sx={{
                color: "#fff",
              }}
            />
            <Typography variant="subtitle1">Vaccinated workers</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <MapsHomeWorkIcon
              sx={{
                color: "#fff",
              }}
            />
            <Typography variant="subtitle1">5000+ household served</Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <StarIcon
              fontSize="small"
              sx={{
                color: "#fff",
              }}
            />
            <Typography variant="subtitle1">4.7 service rating</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon
              fontSize="small"
              sx={{
                color: "#fff",
              }}
            />
            <Typography variant="subtitle1">Verified workers</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "10px 20px",
          border: "1px solid #F58A47",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel variant="outlined" htmlFor="select-area">
            Select Area
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Area"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText
            sx={{
              fontFamily: "Roboto",
              fontSize: "12px",
              fontWeight: "400",
              color: "#00000099",
            }}
          >
            Choose the city in which you wish to receive service
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel variant="outlined" htmlFor="select-cleaning-type">
            Select cleaning type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Cleaning-Type"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText
            sx={{
              fontFamily: "Roboto",
              fontSize: "12px",
              fontWeight: "400",
              color: "#00000099",
            }}
          >
            Choose which job type would you like to avail
          </FormHelperText>
        </FormControl>
      </Box>
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
        <Typography
          sx={{
            margin: "10px 0 20px",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Available Cleaners
        </Typography>
        {workers.map((worker: Worker) => {
          return (
            <WorkerCard
              name={`${worker.profile.first_name} ${worker.profile.last_name}`}
              types={renderTypes(worker)}
              price={renderStartPrice(worker)}
              handleCardClick={() => navigate(`/workers/${worker.id}`)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default SearchWorkerPage;
