import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import StarIcon from "@mui/icons-material/Star";
import { Box, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import WorkerCard from "../../components/WorkerCard/WorkerCard";
import useGetWorkers from "../../hooks/useGetWorkers";
import { useAppSelector } from "../../redux/store";
import { Area, Worker } from "../../redux/type";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
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
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const jobSubtypeParam = queryParams.get("jobSubtype");
  const areaParam = queryParams.get("area");
  const { id } = useParams();
  const { getWorkers } = useGetWorkers();
  const workers = useAppSelector((state) => state.workers);
  const [areas, setAreas] = useState<Area[] | []>([]);
  const [area, setArea] = useState<string | null>(areaParam ?? null);
  const [subtypes, setSubtypes] = useState<
    { id: number; job_name: string; unit: string }[] | []
  >([]);
  const [subtype, setSubtype] = useState<string | null>(
    jobSubtypeParam ?? null
  );
  const [parameters, setParameters] = useState<
    { area?: string; jobSubtype?: string } | {}
  >({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getWorkers(`jobType=${id}`);
  }, []);

  useEffect(() => {
    const getAreas = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/areas");
        setAreas(response.data);
      } catch (error) {
        console.log("error ", error);
      }
    };

    getAreas();
  }, []);

  useEffect(() => {
    const getSubTypes = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/jobtypes/${id}`);
        setSubtypes(response.data.job_subtypes);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (id) {
      getSubTypes();
    }
  }, [id]);

  useEffect(() => {
    if (areaParam) {
      setParameters({ ...parameters, area: areaParam });
      setArea(areaParam);
    }
  }, [areaParam]);

  useEffect(() => {
    if (jobSubtypeParam) {
      setParameters({ ...parameters, jobSubtype: jobSubtypeParam });
      setSubtype(jobSubtypeParam);
    }
  }, [jobSubtypeParam]);

  useEffect(() => {
    let paramString = `jobType=${id}`;
    if (area) {
      paramString = `jobType=${id}&area=${areaParam}`;
    } else if (subtype) {
      paramString = `jobType=${id}&jobSubtype=${jobSubtypeParam}`;
    } else if (area && subtype) {
      paramString = `jobType=${id}&area=${areaParam}&jobSubtype=${jobSubtypeParam}`;
    }

    getWorkers(paramString);
  }, [area, subtype]);

  const handleFilterChange = (e: SelectChangeEvent, filter: string) => {
    if (filter === "area") {
      setArea(e.target.value);
    }

    if (filter === "jobSubtype") {
      setSubtype(e.target.value);
    }

    setParameters({ ...parameters, [filter]: e.target.value });

    const existingParams = new URLSearchParams(searchParams.toString());
    existingParams.delete(filter);

    const newSearchParams = new URLSearchParams(existingParams.toString());
    newSearchParams.append(filter, e.target.value);

    const searchString = newSearchParams.toString();

    navigate(`/services/${id}/workers?${searchString}`);
  };

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
        marginTop: "64px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {slideImages.map((slideImage, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundSize: "cover",
                  height: "200px",
                  borderRadius: "4px",
                  backgroundImage: `url(${slideImage.url})`,
                }}
              />
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
            value={area as string}
            onChange={(e: SelectChangeEvent) => handleFilterChange(e, "area")}
          >
            {areas.map((area) => (
              <MenuItem key={area.id} value={area.area_name}>
                {area.area_name}
              </MenuItem>
            ))}
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
            Select job type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Job-Subtype"
            value={subtype as string}
            onChange={(e: SelectChangeEvent) =>
              handleFilterChange(e, "jobSubtype")
            }
          >
            {subtypes.map((type) => {
              return (
                <MenuItem key={type.id} value={type.job_name}>
                  {type.job_name}
                </MenuItem>
              );
            })}
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
          Available Workers
        </Typography>
        {workers.length > 0 ? (
          workers.map((worker: Worker) => {
            return (
              <WorkerCard
                key={worker.id}
                name={`${worker.profile.first_name} ${worker.profile.last_name}`}
                types={renderTypes(worker)}
                price={renderStartPrice(worker)}
                handleCardClick={() =>
                  navigate(`/services/${id}/workers/${worker.id}`)
                }
              />
            );
          })
        ) : (
          <Typography>No data found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchWorkerPage;
