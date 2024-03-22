import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import ProfileBasicInfoCard from "../../components/Profile/ProfileBasicInfoCard";
import ProfileContactInfoCard from "../../components/Profile/ProfileContactInfoCard";
import ProfilePhotoCard from "../../components/Profile/ProfilePhotoCard";
import ProfileRatesCard from "../../components/Profile/ProfileRatesCard";
import ProfileScheduleCard from "../../components/Profile/ProfileScheduleCard";
import ProfileServicingAreasCard from "../../components/Profile/ProfileServicingAreasCard";
import { LOGGED_IN_USER } from "../../data/WorkerDetails";
import { useAppSelector } from "../../redux/store";
import { Area, JobSubType, User } from "../../redux/type";

export interface JobSubtypeDefault {
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
  const [errorMessages, setErrorMessages] = useState<any>({});
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

  const handleAvatarImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      user_id: LOGGED_IN_USER, // update this during implementation of authentication
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
      console.log("THIS", response);
      if (response.data) {
        setSuccessMessage("Profile details successfully saved!");
        setErrorMessage("");
        setErrorMessages({});
      }
    } catch (error: any) {
      setErrorMessages(error.response.data.errors);
      setSuccessMessage("");
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
          <ProfilePhotoCard
            errorMessages={errorMessages}
            edittingSection={edittingSection}
            avatarImage={avatarImage}
            description={description}
            user={user}
            sectionName="description_photos"
            handleSetEdittingSection={() =>
              setEdittingSection("description_photos")
            }
            handleCancelEdittingSection={() => setEdittingSection("")}
            handleAvatarImageChange={handleAvatarImageChange}
            handleUpload={handeUpload}
            handleSetDescription={(desc) => setDescription(desc)}
            handleSave={handleSave}
          />

          <ProfileBasicInfoCard
            errorMessages={errorMessages}
            edittingSection={edittingSection}
            firstName={firstName}
            middleName={middleName}
            lastName={lastName}
            gender={gender}
            sectionName={"basic_info"}
            birthday={birthday}
            handleSetEdittingSection={() => setEdittingSection("basic_info")}
            handleSetFirstName={(name) => setFirstName(name)}
            handleSetMiddleName={(name) => setMiddleName(name)}
            handleSetLastName={(name) => setLastName(name)}
            handleSetGender={(gender) => setGender(gender)}
            handleSetBirthday={(date) => setBirthday(date)}
            handleSave={handleSave}
            handleCancelEdittingSection={() => setEdittingSection("")}
          />

          <ProfileContactInfoCard
            errorMessages={errorMessages}
            edittingSection={edittingSection}
            phoneNumber={phoneNumber}
            sectionName={"contact_info"}
            email={email}
            handleSetEdittingSection={() => setEdittingSection("contact_info")}
            handleSetEmail={(email) => setEmail(email)}
            handleSetPhoneNumber={(number) => setPhoneNumber(number)}
            handleSave={handleSave}
            handleCancelEdittingSection={() => setEdittingSection("")}
          />

          <ProfileRatesCard
            edittingSection={edittingSection}
            jobType={jobType}
            jobTypes={jobTypes}
            jobSubtypesDefault={jobSubtypesDefault}
            jobSubtypes={jobSubtypes}
            jobTypeId={jobTypeId}
            sectionName="rates"
            handleSetEdittingSection={() => setEdittingSection("rates")}
            handleSave={handleSave}
            handleCancelEdittingSection={() => setEdittingSection("")}
            handleSetJobSubtypes={(types) => setJobSubtypes([...types])}
            handleSetIsSnackbarOpen={(isOpen) => setIsSnackbarOpen(isOpen)}
            handleSetInfoMessage={(message) => setInfoMessage(message)}
            handleSetSelectedJobType={(jobtype) => setSelectedJobType(jobtype)}
          />

          <ProfileScheduleCard
            errorMessages={errorMessages}
            edittingSection={edittingSection}
            schedule={schedule}
            sectionName="schedule"
            handleSetEdittingSection={() => setEdittingSection("schedule")}
            handleSave={handleSave}
            handleCancelEdittingSection={() => setEdittingSection("")}
            handleSetSchedule={(sched) => setSchedule(sched)}
          />

          <ProfileServicingAreasCard
            edittingSection={edittingSection}
            servicingAreas={servicingAreas}
            areas={areas}
            sectionName="servicing_area"
            handleSetEdittingSection={() =>
              setEdittingSection("servicing_area")
            }
            handleSave={handleSave}
            handleCancelEdittingSection={() => setEdittingSection("")}
            handleSetServicingAreas={(areas) => setServicingAreas([...areas])}
          />
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
