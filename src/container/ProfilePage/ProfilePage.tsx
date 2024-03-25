import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Dayjs } from "dayjs";
import React, { useMemo, useState } from "react";
import { JOB_SUB_TYPES, JOB_TYPES } from "../../data/WorkerDetails";
import { useAppSelector } from "../../redux/store";
import { User } from "../../redux/type";

const ProfilePage: React.FC = () => {
  const userSelector = useMemo(() => (state: any) => state.user, []);
  const user: User = useAppSelector(userSelector);
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | Dayjs | null>(null);
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [jobSubtype, setJobSubtype] = useState<
    { jobSubtype: string; rate: string }[] | []
  >([{ jobSubtype: "", rate: "" }]);
  const [businessHours, setBusinessHours] = useState<string>("");
  const [servicingAreas, setServicingAreas] = useState<string[]>([""]);

  console.log("USER", user);
  console.log(
    "WAW",
    jobSubtype.filter((type) => type.jobSubtype === "general cleaning")
  );
  return (
    <Box>
      <Box
        component={"section"}
        sx={{
          textAlign: "center",
          padding: "0",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          padding={"10px 15px"}
        >
          <ArrowBackOutlinedIcon />
          <Button
            variant="contained"
            sx={{
              background: "#F58A47",
              fontFamily: "Open Sans",
              fontWeight: "400px",
              fontSize: "12px",
            }}
          >
            Edit
          </Button>
        </Box>
        <Box
          padding={"20px 0"}
          sx={{
            background: "#A1B5DE",
          }}
        >
          <CameraAltIcon
            sx={{
              color: "#fff",
            }}
          />
        </Box>
      </Box>
      <Box component={"section"} sx={{ padding: "0" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px 10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Avatar
              sx={{
                border: "1px solid #F58A47",
                borderRadius: "90px",
                width: "90px",
                height: "90px",
                padding: "10px",
                backgroundColor: "background.default",
                color: "primary.main",
              }}
            >
              {user.first_name.charAt(0)}
            </Avatar>

            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "22px",
                color: "#F58A47",
              }}
            >
              {user.first_name} {user.middle_name} {user.last_name}
            </Typography>

            <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
              <StarIcon
                sx={{
                  color: "#F58A47",
                  width: "10px",
                }}
              />

              <StarIcon
                sx={{
                  color: "#A1B5DE",
                  width: "10px",
                }}
              />

              <Typography>(4 stars)</Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "1.6",
                margin: "10px 0 20px",
              }}
            >
              {user.role.role_details}
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Basic Info
            </Typography>

            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                margin: "0 0 15px",
              }}
            >
              Some info may be visible to other people
            </Typography>

            <Box>
              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Name</InputAdornment>
                  ),
                }}
                variant="standard"
                value={name}
              />

              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Birthday</InputAdornment>
                  ),
                }}
                variant="standard"
                value={"01/16/1998"}
              />

              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Gender</InputAdornment>
                  ),
                }}
                variant="standard"
                value={gender}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGender(e.target.value)
                }
              />
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Contact Info
            </Typography>

            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                margin: "0 0 15px",
              }}
            >
              Some info may be visible to other people
            </Typography>

            <Box>
              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Email</InputAdornment>
                  ),
                }}
                variant="standard"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Phone</InputAdornment>
                  ),
                }}
                variant="standard"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(e.target.value)
                }
              />
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Rates
            </Typography>

            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                margin: "0 0 15px",
              }}
            >
              Some info may be visible to other people
            </Typography>

            <Box>
              <FormControl variant="standard" fullWidth>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={jobType}
                  label="Age"
                  onChange={(e: SelectChangeEvent) =>
                    setJobType(e.target.value)
                  }
                >
                  {JOB_TYPES.map((type) => {
                    return <MenuItem value={type}>{type}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              {jobType &&
                JOB_SUB_TYPES.filter(
                  (item) => item.job_type === jobType
                )[0].job_subtypes.map((item) => {
                  return (
                    <TextField
                      key={item.name} // Adding a unique key prop
                      id="standard-start-adornment"
                      sx={{ m: 1, width: "100%" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {item.name} ({item.unit})
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      placeholder="e.g. 50"
                      value={
                        jobSubtype.find((type) => type.jobSubtype === item.name)
                          ?.rate || ""
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const updatedJobSubtype = jobSubtype.map((type) =>
                          type.jobSubtype === item.name
                            ? { ...type, rate: e.target.value }
                            : type
                        );
                        setJobSubtype(updatedJobSubtype);
                      }}
                    />
                  );
                })}
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Business Hours
            </Typography>

            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                margin: "0 0 15px",
              }}
            >
              Some info may be visible to other people
            </Typography>

            <Box sx={{ paddingRight: "20px" }}>
              <TextField
                fullWidth
                id="standard-start-adornment"
                sx={{ m: 1 }}
                variant="standard"
                value={businessHours}
                multiline
                minRows={1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBusinessHours(e.target.value)
                }
              />
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "1.7",
                }}
              >
                Servicing Area
              </Typography>
              <ControlPointOutlinedIcon
                onClick={() =>
                  setServicingAreas((prevState) => [...prevState, ""])
                }
                sx={{
                  color: "#F58A47",
                }}
              />
            </Box>

            <Box sx={{ paddingRight: "20px" }}>
              {servicingAreas.map((area, index) => (
                <TextField
                  key={index}
                  sx={{
                    width: "100%",
                    padding: "0 15px",
                  }}
                  id={`standard-basic-${index}`}
                  variant="standard"
                  value={area}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newAreas = [...servicingAreas];
                    newAreas[index] = e.target.value;
                    setServicingAreas(newAreas);
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    // </Box>
  );
};

export default ProfilePage;
