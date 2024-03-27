import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import StarIcon from "@mui/icons-material/Star";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { JOB_SUB_TYPES, JOB_TYPES } from "../../data/WorkerDetails";
import { useAppSelector } from "../../redux/store";
import { Area, JobSubType, User } from "../../redux/type";

interface JobDetails {
  job_type: string;
  job_subtypes: Omit<JobSubType, "job_type">[];
}

const ProfilePage: React.FC = () => {
  const userSelector = useMemo(() => (state: any) => state.user, []);
  const user: User = useAppSelector(userSelector);
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | Dayjs | null>(null);
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [jobSubtype, setJobSubtype] = useState<
    { jobSubtype: string; jobUnitPrice: number | null }[] | []
  >([{ jobSubtype: "", jobUnitPrice: null }]);
  const [businessHours, setBusinessHours] = useState<string>("");
  const [servicingAreas, setServicingAreas] = useState<Area[]>([
    { area_name: "" },
  ]);
  const [edittingSection, setEdittingSection] = useState<string>("");

  const jobDetails: { job: JobDetails } = user?.job_subtypes?.reduce(
    (acc: any, current: any) => {
      const jobType = current.job_type;

      if (!acc["job"]) {
        acc["job"] = {
          job_type: jobType,
          job_subtypes: [
            {
              job_name: current.job_name,
              job_unit_price: current.job_unit_price,
              unit: current.unit,
            },
          ],
        };
      } else {
        acc["job"].job_subtypes.push({
          job_name: current.job_name,
          job_unit_price: current.job_unit_price,
          unit: current.unit,
        });
      }
      return acc;
    },
    {}
  );

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setMiddleName(user.middle_name);
      setLastName(user.last_name);
      setBirthday(dayjs(user.birthday));
      setEmail(user.email);
      setGender(user.gender);
      setPhoneNumber(user.phone_number);
      setJobType(jobDetails?.job?.job_type);

      const updatedJobSubtype: { jobSubtype: string; jobUnitPrice: number }[] =
        jobDetails?.job?.job_subtypes?.map((subtype) => ({
          jobSubtype: subtype.job_name,
          jobUnitPrice: subtype.job_unit_price,
        }));

      setJobSubtype(updatedJobSubtype);
      setBusinessHours(user.business_hours);
      setServicingAreas(user.areas);
    }
  }, [user]);

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
          sx={{
            padding: "10px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ArrowBackOutlinedIcon />
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
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
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
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  padding: "0",
                }}
                onClick={() => setEdittingSection("basic_info")}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
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

            <Box sx={{ textAlign: "center" }}>
              <TextField
                disabled={edittingSection !== "basic_info"}
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">First Name</InputAdornment>
                  ),
                }}
                variant="standard"
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
              />
              <TextField
                disabled={edittingSection !== "basic_info"}
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Middle Name
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                value={middleName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMiddleName(e.target.value)
                }
              />
              <TextField
                disabled={edittingSection !== "basic_info"}
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Last Name</InputAdornment>
                  ),
                }}
                variant="standard"
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {birthday !== null ? (
                  <DatePicker
                    disabled={edittingSection !== "basic_info"}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              Birthday
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                    sx={{ m: 1, width: "100%" }}
                    value={dayjs(birthday)}
                    onChange={(date) => setBirthday(date)}
                  />
                ) : (
                  <DatePicker
                    disabled={edittingSection !== "basic_info"}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              Birthday
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                    sx={{ m: 1, width: "100%" }}
                    onChange={(date) => setBirthday(date)}
                  />
                )}
              </LocalizationProvider>

              <TextField
                disabled={edittingSection !== "basic_info"}
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

              {edittingSection === "basic_info" && (
                <ButtonGroup>
                  <Button
                    onClick={() => setEdittingSection("")}
                    sx={{ marginTop: "20px" }}
                    size="small"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    sx={{ marginTop: "20px", color: "common.white" }}
                    size="small"
                    variant="contained"
                  >
                    Save
                  </Button>
                </ButtonGroup>
              )}
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
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  padding: "0",
                }}
                onClick={() => setEdittingSection("contact_info")}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
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

            <Box sx={{ textAlign: "center" }}>
              <TextField
                disabled={edittingSection !== "contact_info"}
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
                disabled={edittingSection !== "contact_info"}
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

              {edittingSection === "contact_info" && (
                <ButtonGroup>
                  <Button
                    onClick={() => setEdittingSection("")}
                    sx={{ marginTop: "20px" }}
                    size="small"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    sx={{ marginTop: "20px", color: "common.white" }}
                    size="small"
                    variant="contained"
                  >
                    Save
                  </Button>
                </ButtonGroup>
              )}
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
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  padding: "0",
                }}
                onClick={() => setEdittingSection("rates")}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
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

            <Box sx={{ padding: "20px", textAlign: "center" }}>
              <FormControl variant="standard" fullWidth>
                <Select
                  sx={{ textAlign: "left" }}
                  disabled={edittingSection !== "rates"}
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
                    return (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {jobType &&
                JOB_SUB_TYPES.filter(
                  (item) => item.job_type === jobType
                )[0]?.job_subtypes?.map((item) => {
                  return (
                    <TextField
                      disabled={edittingSection !== "rates"}
                      key={item.name}
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
                          ?.jobUnitPrice || null
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const updatedJobSubtype = jobSubtype?.map((type) =>
                          type.jobSubtype === item.name
                            ? { ...type, jobUnitPrice: Number(e.target.value) }
                            : type
                        );
                        setJobSubtype(updatedJobSubtype);
                      }}
                    />
                  );
                })}

              {edittingSection === "rates" && (
                <ButtonGroup>
                  <Button
                    onClick={() => setEdittingSection("")}
                    sx={{ marginTop: "20px" }}
                    size="small"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    sx={{ marginTop: "20px", color: "common.white" }}
                    size="small"
                    variant="contained"
                  >
                    Save
                  </Button>
                </ButtonGroup>
              )}
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
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  padding: "0",
                }}
                onClick={() => setEdittingSection("business_hours")}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
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

            <Box
              sx={{
                paddingRight: "20px",
                textAlign: "center",
              }}
            >
              <TextField
                disabled={edittingSection !== "business_hours"}
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
              {edittingSection === "business_hours" && (
                <ButtonGroup>
                  <Button
                    onClick={() => setEdittingSection("")}
                    sx={{ marginTop: "20px" }}
                    size="small"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    sx={{ marginTop: "20px", color: "common.white" }}
                    size="small"
                    variant="contained"
                  >
                    Save
                  </Button>
                </ButtonGroup>
              )}
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

              {edittingSection === "servicing_area" ? (
                <ControlPointOutlinedIcon
                  onClick={() =>
                    setServicingAreas((prevState) => [
                      ...prevState,
                      { area_name: "" },
                    ])
                  }
                  sx={{
                    color: "#F58A47",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      padding: "0",
                    }}
                    onClick={() => setEdittingSection("servicing_area")}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Box sx={{ paddingRight: "20px", textAlign: "center" }}>
              {servicingAreas?.map((area, index) => (
                <TextField
                  disabled={edittingSection !== "servicing_area"}
                  key={index}
                  sx={{
                    width: "100%",
                    padding: "0 15px",
                  }}
                  id={`standard-basic-${index}`}
                  variant="standard"
                  value={area.area_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newAreas = [...servicingAreas];
                    newAreas[index] = {
                      ...newAreas[index],
                      area_name: e.target.value,
                    };
                    setServicingAreas(newAreas);
                  }}
                />
              ))}

              {edittingSection === "servicing_area" && (
                <ButtonGroup>
                  <Button
                    onClick={() => setEdittingSection("")}
                    sx={{ marginTop: "20px" }}
                    size="small"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    sx={{ marginTop: "20px", color: "common.white" }}
                    size="small"
                    variant="contained"
                  >
                    Save
                  </Button>
                </ButtonGroup>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    // </Box>
  );
};

export default ProfilePage;
