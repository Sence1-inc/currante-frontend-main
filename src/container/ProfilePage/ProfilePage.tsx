import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import StarIcon from "@mui/icons-material/Star";
import {
  Alert,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
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

interface JobSubtypeDefault {
  job_type: string;
  job_subtypes: { name: string; unit: string; id: number }[];
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
  const [jobTypeId, setJobTypeId] = useState<number | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [jobSubtypes, setJobSubtypes] = useState<JobSubType[]>([]);
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
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [jobTypes, setJobtypes] = useState<
    { id: number; job_type_name: string }[] | []
  >([]);
  const [jobSubtypesDefault, setJobSubtypesDefault] =
    useState<JobSubtypeDefault>({
      job_type: "",
      job_subtypes: [{ name: "", unit: "", id: 0 }],
    });

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

  const uniqueJobType: string = Array.from(
    new Set(
      user?.job_subtypes
        .filter((job) => job.active_flg === 1)
        .map((job) => job.job_type)
    )
  )[0];

  const uniqueJobTypeId = Array.from(
    new Set(
      user?.job_subtypes
        .filter((job) => job.active_flg === 1)
        .map((job) => job.job_type_id)
    )
  )[0];

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
    if (
      jobSubtypes.length > 0 &&
      jobSubtypes.find((type) => type.job_name === "")
    ) {
      const filteredSubtype = jobSubtypes.filter(
        (type) => type.job_name.trim() !== ""
      );

      setJobSubtypes(filteredSubtype);
    }
  }, [jobSubtypes]);

  useEffect(() => {
    if (jobType) {
      const prevJobSubtypes = jobSubtypes?.filter(
        (type) => type.job_type !== jobType
      );
      const selectedJobSubtypes = jobSubtypes?.filter(
        (type) => type.job_type === jobType
      );

      const inactiveJobSubtypes = prevJobSubtypes.map((subtype) => ({
        ...subtype,
        active_flg: 0,
      }));

      const activeJobSubtypes = selectedJobSubtypes.map((subtype) => ({
        ...subtype,
        active_flg: 1,
      }));

      setJobSubtypes([...inactiveJobSubtypes, ...activeJobSubtypes]);
    }
  }, [jobType]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setMiddleName(user.middle_name);
      setLastName(user.last_name);
      setBirthday(dayjs(user.birthday));
      setEmail(user.email);
      setGender(user.gender);
      setPhoneNumber(user.phone_number);
      setJobType(uniqueJobType);
      setJobTypeId(uniqueJobTypeId);
      setJobSubtypes(user.job_subtypes);
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

    const getJobtypes = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/jobtypes`);
        setJobtypes(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getAreas();
    getJobtypes();
  }, []);

  useEffect(() => {
    const getJobSubtypes = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/v1/jobtypes/${jobTypeId}`
        );

        setJobSubtypesDefault({ ...data });
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (jobType) {
      getJobSubtypes();
    }
  }, [jobType]);

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
                  onChange={(e: SelectChangeEvent) => {
                    setIsSnackbarOpen(true);
                    setInfoMessage(
                      `Are you sure you want to set your job type to ${e.target.value}?`
                    );
                    setSelectedJobType(e.target.value);
                  }}
                >
                  {jobTypes.map((type) => {
                    return (
                      <MenuItem key={type.id} value={type.job_type_name}>
                        {type.job_type_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {jobType &&
                jobSubtypesDefault?.job_type === jobType &&
                jobSubtypesDefault?.job_subtypes?.map((item) => {
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
                        (Array.isArray(jobSubtypes) &&
                          jobSubtypes.find((type) => {
                            return (
                              type.job_name === item.name &&
                              type.job_type === jobType
                            );
                          })?.job_unit_price) ??
                        null
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const subtype =
                          Array.isArray(jobSubtypes) &&
                          jobSubtypes.find(
                            (type) =>
                              type.job_type === jobType &&
                              type.job_name === item.name &&
                              type.active_flg
                          );
                        if (subtype) {
                          const subtypeData = {
                            job_unit_price: Number(e.target.value),
                            unit: item.unit,
                          };
                          setJobSubtypes([
                            ...jobSubtypes.filter(
                              (type) => type.job_name !== item.name
                            ),
                            { ...subtype, ...subtypeData },
                          ]);
                        } else {
                          const newJobSubtype = [
                            {
                              job_subtype_id: item.id,
                              job_type: jobType,
                              job_type_id: jobTypeId,
                              job_name: item.name,
                              job_unit_price: Number(e.target.value),
                              unit: item.unit,
                              active_flg: true,
                            },
                          ];

                          setJobSubtypes([...jobSubtypes, ...newJobSubtype]);
                        }
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={infoMessage ? 10000 : 4000}
        message={
          successMessage
            ? successMessage
            : errorMessage
            ? errorMessage
            : infoMessage
        }
        key="topcenter"
        sx={{
          color: errorMessage ? "red" : "green",
          marginBottom: "16px",
          width: "80%",
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setIsSnackbarOpen(false)}
          severity={
            successMessage ? "success" : errorMessage ? "error" : "info"
          }
        >
          {successMessage
            ? successMessage
            : errorMessage
            ? errorMessage
            : infoMessage}

          {infoMessage && (
            <Box>
              <Button color="primary" onClick={() => setIsSnackbarOpen(false)}>
                Cancel
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  const selectedJobTypeId =
                    jobTypes.find(
                      (type) => type.job_type_name === selectedJobType
                    )?.id || null;
                  setJobType(selectedJobType);
                  setJobTypeId(selectedJobTypeId);
                  setIsSnackbarOpen(false);
                }}
              >
                Proceed
              </Button>
            </Box>
          )}
        </Alert>
      </Snackbar>
    </Box>
    // </Box>
  );
};

export default ProfilePage;
