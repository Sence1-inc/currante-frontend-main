import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import StarIcon from "@mui/icons-material/Star";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { JOB_SUB_TYPES, JOB_TYPES } from "../../data/WorkerDetails";
import { useAppSelector } from "../../redux/store";
import { Area, JobSubType, User } from "../../redux/type";

interface JobDetails {
  job_type: string;
  job_subtypes: Omit<JobSubType, "job_type">[];
}

interface Photo {
  profile_photo: string;
  id_photo: string;
}

interface UserPhotos {
  photos: string[];
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
  const [jobSubtypes, setJobSubtypes] = useState<
    | { jobSubtype: string; jobUnitPrice: number | null; unit: string | null }[]
    | []
  >([{ jobSubtype: "", jobUnitPrice: null, unit: "" }]);
  const [schedule, setSchedule] = useState<string>("");
  const [servicingAreas, setServicingAreas] = useState<Area[]>([
    { id: null, area_name: "" },
  ]);
  const [edittingSection, setEdittingSection] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // const [coverPhotos, setCoverPhotos] = useState<File[] | null>(null);
  // const { image, uploader } = useDisplayImage();
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [presignedUrl, setPresignedUrl] = useState<string>("");
  const [areas, setAreas] = useState<{ id: number; area_name: string }[]>([]);

  const handleavatarImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        getPresignedURL();
        setAvatarImage(reader.result as string);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const userPhotos = (photos: Photo[]): UserPhotos => {
    const rearrangedPhotos: UserPhotos = { photos: [] };

    photos.forEach((photo) => {
      if (!rearrangedPhotos.photos) {
        rearrangedPhotos.photos = [];
      }
      rearrangedPhotos.photos.push(photo.profile_photo);
    });

    return rearrangedPhotos;
  };

  useEffect(() => {
    if (edittingSection !== "servicing_areas") {
      const filteredServicingAreas = servicingAreas.filter(
        (area) => area.area_name.trim() !== ""
      );

      setServicingAreas(filteredServicingAreas);
    }
  }, [edittingSection]);

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

      const updatedJobSubtype: {
        jobSubtype: string;
        jobUnitPrice: number;
        unit: string;
      }[] = jobDetails?.job?.job_subtypes?.map((subtype) => ({
        jobSubtype: subtype.job_name,
        jobUnitPrice: subtype.job_unit_price,
        unit: subtype.unit,
      }));

      setJobSubtypes(updatedJobSubtype);
      setSchedule(user.schedule);
      setServicingAreas(user.areas);
      setDescription(user.description);

      const user_photos = userPhotos(user.user_photos);

      console.log(user_photos);
    }
  }, [user]);

  useEffect(() => {
    const getAreas = async () => {
      try {
        const { data } = await axiosInstance.get("/api/v1/areas");
        if (data) {
          setAreas(data);
        } else {
          setAreas([]);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getAreas();
  }, []);

  const handleSave = async () => {
    const data = {
      user_id: 1, // update this during implementation of authentication
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      suffix: "",
      birthday: new Date(birthday?.toString() as string),
      gender: gender,
      phone_number: phoneNumber,
      job_type: jobType,
      job_subtypes: jobSubtypes,
      schedule: schedule,
      servicing_areas: servicingAreas,
      description: description,
      verified: 1,
    };

    try {
      const response = await axiosInstance.post("/api/v1/profiles", data);
      console.log("response", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getPresignedURL = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/upload");
      setPresignedUrl(response.data.url);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handeUpload = async () => {
    if (!presignedUrl || !avatarImage) return;

    if (file) {
      try {
        await axiosInstance.put(presignedUrl, avatarImage, {
          headers: {
            "Content-Type": file.type,
          },
        });
        console.log("File uploaded successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      return;
    }
  };

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
                onClick={() => setEdittingSection("description_photos")}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
            {edittingSection === "description_photos" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="avatar-upload-button"
                  type="file"
                  onChange={handleavatarImageChange}
                />
                <label htmlFor="avatar-upload-button">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                {avatarImage && (
                  <Avatar
                    src={avatarImage}
                    sx={{
                      border: "1px solid #F58A47",
                      borderRadius: "90px",
                      width: "90px",
                      height: "90px",
                      padding: "10px",
                      backgroundColor: "background.default",
                      color: "primary.main",
                    }}
                  />
                )}
                {avatarImage && <button onClick={handeUpload}>Upload</button>}
              </div>
            ) : avatarImage ? (
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
              />
            ) : (
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
            )}

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

            {edittingSection !== "description_photos" ? (
              <Typography
                sx={{
                  fontFamily: "Open Sans",
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "1.6",
                  margin: "10px 0 20px",
                }}
              >
                {description}
              </Typography>
            ) : (
              <TextField
                multiline
                minRows={1}
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                variant="standard"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              />
            )}

            {edittingSection === "description_photos" && (
              <ButtonGroup>
                <Button
                  onClick={() => setEdittingSection("")}
                  size="small"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  color="secondary"
                  sx={{ color: "common.white" }}
                  size="small"
                  variant="contained"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </ButtonGroup>
            )}
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
                    onClick={handleSave}
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
                    onClick={handleSave}
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
                  label="Job Type"
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
                        jobSubtypes.find(
                          (type) => type.jobSubtype === item.name
                        )?.jobUnitPrice || null
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const updatedJobSubtype = jobSubtypes?.map((type) =>
                          type.jobSubtype === item.name
                            ? {
                                ...type,
                                jobUnitPrice: Number(e.target.value),
                                unit: item.unit,
                              }
                            : type
                        );
                        setJobSubtypes(updatedJobSubtype);
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
                    onClick={handleSave}
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
                onClick={() => setEdittingSection("schedule")}
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
                disabled={edittingSection !== "schedule"}
                fullWidth
                id="standard-start-adornment"
                sx={{ m: 1 }}
                variant="standard"
                value={schedule}
                multiline
                minRows={1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSchedule(e.target.value)
                }
              />
              {edittingSection === "schedule" && (
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
                    onClick={handleSave}
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
                      { id: null, area_name: "" },
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
                <FormControl variant="standard" fullWidth>
                  <Box sx={{ width: "100%", margin: "0 8px" }}>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      disabled={
                        edittingSection !== "servicing_area" ||
                        servicingAreas.length >= 16
                      }
                      key={index}
                      sx={{
                        textAlign: "left",
                        width:
                          edittingSection === "servicing_area" ? "86%" : "100%",
                      }}
                      value={area.area_name as string}
                      onChange={(e: SelectChangeEvent) => {
                        const newAreas = [...servicingAreas];
                        newAreas[index] = {
                          ...newAreas[index],
                          area_name: e.target.value as string,
                        };
                        setServicingAreas(newAreas);
                      }}
                    >
                      {areas.map((area) => (
                        <MenuItem key={area.id} value={area.area_name}>
                          {area.area_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {edittingSection === "servicing_area" && (
                      <IconButton
                        onClick={() => {
                          const newServicingAreas = servicingAreas.filter(
                            (servicingArea) =>
                              servicingArea.area_name !== area.area_name
                          );
                          setServicingAreas(newServicingAreas);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </FormControl>
              ))}

              {edittingSection === "servicing_area" && (
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      const filteredServicingAreas = servicingAreas.filter(
                        (area) => area.area_name.trim() !== ""
                      );

                      setServicingAreas(filteredServicingAreas);
                      setEdittingSection("");
                    }}
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
                    onClick={() => {
                      const filteredServicingAreas = servicingAreas.filter(
                        (area) => area.area_name.trim() !== ""
                      );

                      setServicingAreas(filteredServicingAreas);
                      handleSave;
                    }}
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
