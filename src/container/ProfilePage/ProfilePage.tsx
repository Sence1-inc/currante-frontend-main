import { Box } from "@mui/material";
import axios from "axios";
import imageCompression from "browser-image-compression";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import ProfileAddressesCard from "../../components/Profile/ProfileAddressesCard";
import ProfileBasicInfoCard from "../../components/Profile/ProfileBasicInfoCard";
import ProfileIDPhotoCard from "../../components/Profile/ProfileIDPhotoCard";
import ProfilePhotoCard from "../../components/Profile/ProfilePhotoCard";
import ProfileRatesCard from "../../components/Profile/ProfileRatesCard";
import ProfileScheduleCard from "../../components/Profile/ProfileScheduleCard";
import ProfileServicingAreasCard from "../../components/Profile/ProfileServicingAreasCard";
import { CITIES, PROVINCES } from "../../data/WorkerDetails";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Address, Area, JobSubType, User } from "../../redux/type";

export interface JobSubtypeDefault {
  job_type: string;
  job_subtypes: { job_name: string; unit: string; id: number }[];
}

const ProfilePage: React.FC = () => {
  const userSelector = useMemo(() => (state: any) => state.user, []);
  const user: User = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
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
  const [addresses, setAddresses] = useState<Address[] | []>([]);
  const [edittingSection, setEdittingSection] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [presignedUrl, setPresignedUrl] = useState<string>("");
  const [areas, setAreas] = useState<{ id: number; area_name: string }[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<any>({});
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [jobTypes, setJobtypes] = useState<
    { id: number; job_type_name: string }[] | []
  >([]);
  const [jobSubtypesDefault, setJobSubtypesDefault] =
    useState<JobSubtypeDefault>({
      job_type: "",
      job_subtypes: [{ job_name: "", unit: "", id: 0 }],
    });
  const [isButtonLoading, setIsButtonLoading] = useState<{
    save: boolean;
    cancel: boolean;
  }>({ save: false, cancel: false });

  const handleAvatarImageChange = (item: FileList) => {
    const file = item && item[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        getPresignedURL(file, "avatar");
        setAvatarImage(reader.result as string);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        getPresignedURL(file, "identification");
        setIdImage(reader.result as string);
        setIdFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  let uniqueJobType: string;
  let uniqueJobTypeId: number | null;

  if (user?.job_subtypes) {
    uniqueJobType = Array.from(
      new Set(
        user.job_subtypes
          .filter((job) => job.active_flg === 1)
          .map((job) => job.job_type)
      )
    )[0];

    uniqueJobTypeId = Array.from(
      new Set(
        user.job_subtypes
          .filter((job) => job.active_flg === 1)
          .map((job) => job.job_type_id)
      )
    )[0];
  }

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
      jobSubtypes &&
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
      setAddresses(user.addresses);
      setDescription(user.description);
      setAvatarImage(user.id_photo);
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
    setIsButtonLoading({ save: true, cancel: false });
    setIsSnackbarOpen(false);
    const data = {
      user_id: user.id, // update this during implementation of authentication
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
      addresses: addresses,
      description: description,
      verified: 1,
    };

    try {
      const response = await axiosInstance.post("/api/v1/profiles", data);
      setIsButtonLoading({ save: false, cancel: false });
      if (response.status === 201) {
        setSuccessMessage(response.data.message);
        setIsSnackbarOpen(true);
        setErrorMessage("");
        setErrorMessages({});
        dispatch(initializeUser(response.data.profile));
      }
    } catch (error: any) {
      setIsButtonLoading({ save: false, cancel: false });
      setIsSnackbarOpen(true);
      setErrorMessages(error.response.data.errors);
      setErrorMessage("Please fill in the required details");
      setSuccessMessage("");
    }
  };

  const getPresignedURL = async (file: File, type: string) => {
    try {
      const response = await axiosInstance.get("/api/v1/presigned-url", {
        params: {
          filename: `${file?.name}-${type}-${user.first_name}-${user.last_name}-${user.last_name}-${file?.lastModified}`,
          filetype: file?.type,
        },
      });
      setPresignedUrl(response.data.url);
    } catch (error: any) {
      setErrorMessages(error.response.data.errors);
    }
  };

  const savePhoto = async (type: string) => {
    try {
      const filename =
        type === "identification"
          ? `${idFile?.name}-identification-${user.first_name}-${user.last_name}-${user.last_name}-${idFile?.lastModified}`
          : `${file?.name}-avatar-${user.first_name}-${user.last_name}-${user.last_name}-${file?.lastModified}`;
      const response = await axiosInstance.post("/api/v1/upload", {
        id: user.id,
        filename: filename,
        type: type,
      });

      if (response.status === 200) {
        const savedPhoto =
          type === "identification"
            ? { identification_photo: response.data.identification }
            : { id_photo: response.data.avatar };
        setIsButtonLoading({ save: false, cancel: false });
        dispatch(initializeUser({ ...response.data.user, ...savedPhoto }));
        setIsSnackbarOpen(true);
        setSuccessMessage(response.data.message);
        setErrorMessage("");
      }
    } catch (error: any) {
      setIsButtonLoading({ save: false, cancel: false });
      setSuccessMessage("");
      setIsSnackbarOpen(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleUpload = async (type: string) => {
    setIsButtonLoading({ save: true, cancel: false });
    if (!presignedUrl) return;

    const image = type === "avatar" ? file : idFile;

    if (image) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(image, options);

        await axios.put(presignedUrl, compressedFile, {
          headers: {
            "Content-Type": image.type,
          },
        });

        savePhoto(type);
      } catch (error: any) {
        setIsButtonLoading({ save: false, cancel: false });
        setSuccessMessage("");
        setIsSnackbarOpen(true);
        setErrorMessage(error.response.message);
      }
    } else {
      setIsButtonLoading({ save: false, cancel: false });
      setSuccessMessage("");
      setIsSnackbarOpen(true);
      setErrorMessage("Upload unsuccessful");
      return;
    }
  };

  return (
    <Box>
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
            isButtonLoading={isButtonLoading}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
            setInfoMessage={setInfoMessage}
            setIsSnackbarOpen={setIsSnackbarOpen}
            errorMessages={errorMessages}
            edittingSection={edittingSection}
            avatarImage={avatarImage}
            description={
              description && user.logged_in_as === "worker" ? description : ""
            }
            user={user}
            sectionName="description_photos"
            handleSetEdittingSection={() =>
              setEdittingSection("description_photos")
            }
            handleCancelEdittingSection={() => setEdittingSection("")}
            handleAvatarImageChange={(file: FileList) =>
              handleAvatarImageChange(file)
            }
            handleUpload={() => handleUpload("avatar")}
            handleSetDescription={(desc) => setDescription(desc)}
            handleSave={handleSave}
          />

          <ProfileBasicInfoCard
            isButtonLoading={isButtonLoading}
            errorMessages={errorMessages}
            edittingSection={edittingSection}
            firstName={firstName ?? ""}
            middleName={middleName ?? ""}
            lastName={lastName ?? ""}
            gender={gender ?? ""}
            birthday={birthday}
            phoneNumber={phoneNumber ?? ""}
            email={email ?? ""}
            sectionName={"basic_info"}
            handleSetEmail={(email) => setEmail(email)}
            handleSetPhoneNumber={(number) => setPhoneNumber(number)}
            handleSetEdittingSection={() => setEdittingSection("basic_info")}
            handleSetFirstName={(name) => setFirstName(name)}
            handleSetMiddleName={(name) => setMiddleName(name)}
            handleSetLastName={(name) => setLastName(name)}
            handleSetGender={(gender) => setGender(gender)}
            handleSetBirthday={(date) => setBirthday(date)}
            handleSave={handleSave}
            handleCancelEdittingSection={() => setEdittingSection("")}
          />

          {user.logged_in_as === "worker" && (
            <ProfileRatesCard
              isButtonLoading={isButtonLoading}
              edittingSection={edittingSection}
              jobType={jobType ?? ""}
              jobTypes={jobTypes ?? []}
              jobSubtypesDefault={jobSubtypesDefault}
              jobSubtypes={jobSubtypes}
              jobTypeId={jobTypeId}
              sectionName="rates"
              handleSetEdittingSection={() => setEdittingSection("rates")}
              handleSave={handleSave}
              handleCancelEdittingSection={() => setEdittingSection("")}
              handleSetJobSubtypes={(types) => {
                setJobSubtypes([...types]);
              }}
              handleSetIsSnackbarOpen={(isOpen) => setIsSnackbarOpen(isOpen)}
              handleSetWarningMessage={(message) => setWarningMessage(message)}
              handleSetSelectedJobType={(jobtype) => {
                setSuccessMessage("");
                setErrorMessage("");
                setSelectedJobType(jobtype);
              }}
            />
          )}

          {user.logged_in_as === "worker" && (
            <ProfileScheduleCard
              isButtonLoading={isButtonLoading}
              errorMessages={errorMessages}
              edittingSection={edittingSection}
              schedule={schedule ?? ""}
              sectionName="schedule"
              handleSetEdittingSection={() => setEdittingSection("schedule")}
              handleSave={handleSave}
              handleCancelEdittingSection={() => setEdittingSection("")}
              handleSetSchedule={(sched) => setSchedule(sched)}
            />
          )}

          {user.logged_in_as === "worker" && (
            <ProfileServicingAreasCard
              isButtonLoading={isButtonLoading}
              edittingSection={edittingSection}
              servicingAreas={servicingAreas ?? []}
              areas={areas}
              sectionName="servicing_area"
              handleSetEdittingSection={() =>
                setEdittingSection("servicing_area")
              }
              handleSave={handleSave}
              handleCancelEdittingSection={() => setEdittingSection("")}
              handleSetServicingAreas={(areas) => setServicingAreas([...areas])}
            />
          )}

          {user.logged_in_as === "employer" && (
            <ProfileAddressesCard
              isButtonLoading={isButtonLoading}
              errorMessages={errorMessages}
              edittingSection={edittingSection}
              addresses={addresses ?? []}
              cities={CITIES}
              provinces={PROVINCES}
              sectionName="addresses"
              handleSetEdittingSection={() => setEdittingSection("addresses")}
              handleSave={handleSave}
              handleCancelEdittingSection={() => setEdittingSection("")}
              handleSetAddresses={(adds) => {
                setAddresses([...adds]);
              }}
            />
          )}

          <ProfileIDPhotoCard
            isButtonLoading={isButtonLoading}
            idImage={idImage}
            handleImageChange={handleImageChange}
            edittingSection={edittingSection}
            sectionName="philsys"
            handleSetEdittingSection={() => setEdittingSection("philsys")}
            handleUpload={() => handleUpload("identification")}
            handleCancelEdittingSection={() => setEdittingSection("")}
          />
        </Box>
      </Box>
      <CustomSnackbar
        errorMessage={errorMessage}
        successMessage={successMessage}
        warningMessage={warningMessage}
        infoMessage={infoMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
        handleWarningProceed={() => {
          const selectedJobTypeId =
            jobTypes.find((type) => type.job_type_name === selectedJobType)
              ?.id || null;
          setJobType(selectedJobType);
          setJobTypeId(selectedJobTypeId);
          setIsSnackbarOpen(false);
        }}
      />
    </Box>
  );
};

export default ProfilePage;
