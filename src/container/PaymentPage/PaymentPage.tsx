import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatISO } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../../axiosInstance";
import PaymentCard from "../../components/PaymentCard/PaymentCard";
import StepperWithError from "../../components/Stepper/Stepper";
import useGetWorker from "../../hooks/useGetWorker";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { JobSubType, Order, Worker } from "../../redux/type";

const PaymentPage = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user);
  const { getWorker } = useGetWorker();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [stepFailed, setStepFailed] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [jobSubtype, setJobSubtype] = useState<string>("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [subtypeDetails, setSubtypeDetails] = useState<JobSubType | null>(null);
  const [firstChoiceDate, setFirstChoiceDate] = useState<
    Date | Dayjs | string | null
  >(null);
  const [secondChoiceDate, setSecondChoiceDate] = useState<
    Date | Dayjs | string | null
  >(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getWorker(Number(id));
      setWorker(data); // put this in a state
    };
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    if (quantity) {
      setTotal(
        Number(subtypeDetails?.job_unit_price || 0) * Number(quantity || 1)
      );
    }
  }, [quantity]);

  useEffect(() => {
    const subtypeDetails = worker?.profile?.job_subtypes?.find(
      (type) => type.job_name?.toLowerCase() === jobSubtype?.toLowerCase()
    );

    if (subtypeDetails) {
      setSubtypeDetails(subtypeDetails);
    }

    if (jobSubtype && subtypeDetails?.job_type !== "Cleaning") {
      setQuantity(1);
    }
  }, [jobSubtype]);

  const handleAccept = async () => {
    // move this after successful payment step
    const workerJobSubtype = worker?.profile.job_subtypes.find(
      (type) => type.active_flg && type.job_name === jobSubtype
    );

    try {
      const data = {
        worker_id: Number(id),
        employer_id: user.id,
        worker_job_subtype_id: workerJobSubtype?.worker_job_subtype_id,
        quantity: quantity,
        total: total,
        status: 1,
        job_order_start_date: formatISO(
          new Date(dayjs(firstChoiceDate).format())
        ),
      };

      const response = await axiosInstance.post("/api/v1/orders", data);
      if (response.data) {
        dispatch(
          initializeUser({
            ...user,
            orders: [...user.orders, response.data.order as Order],
          })
        );
        navigate("/jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "64px",
        marginBottom: "84px",
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <StepperWithError
        steps={["Information", "Payment"]}
        errorMessage={errorMessage}
        stepFailed={stepFailed as number}
        activeStep={activeStep}
      />
      <PaymentCard title="Worker schedule and details">
        <Typography variant="h6" sx={{ color: "common.black" }}>
          {worker?.profile.first_name} {worker?.profile.middle_name}
          {worker?.profile.last_name}
        </Typography>
        <FormControl variant="standard" fullWidth>
          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Job Type
            </Typography>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              sx={{
                textAlign: "left",
                width: "100%",
              }}
              value={jobSubtype as string}
              onChange={(e: SelectChangeEvent) => setJobSubtype(e.target.value)}
            >
              {worker?.profile.job_subtypes
                .filter((type) => type.active_flg)
                .map((job_subtype: JobSubType) => (
                  <MenuItem
                    key={job_subtype.job_subtype_id}
                    value={job_subtype.job_name}
                  >
                    {job_subtype.job_name}
                  </MenuItem>
                ))}
            </Select>
          </Box>
        </FormControl>
        {jobSubtype &&
          worker?.profile.job_subtypes.filter((type) => type.active_flg)?.[0]
            .job_type == "Cleaning" && (
            <FormControl variant="standard" fullWidth>
              <Box sx={{ width: "100%", margin: "0 8px" }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "16px",
                    lineHeight: "1.7",
                  }}
                >
                  Estimated area (sqm)
                </Typography>
                <TextField
                  // error={isEmptyObject(errorMessages, "description")}
                  // multiline
                  // minRows={1}
                  id="standard-start-adornment"
                  sx={{ width: "100%" }}
                  variant="standard"
                  value={quantity?.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuantity(Number(e.target.value))
                  }
                  // helperText={errorMessages.description}
                />
              </Box>
            </FormControl>
          )}
        <Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "1.7",
            }}
          >
            Order Summary
          </Typography>
          <Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Price per {subtypeDetails?.unit}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              {subtypeDetails?.job_unit_price}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6" sx={{ color: "common.black" }}>
                Total
              </Typography>
              <Typography variant="subtitle1">
                (incl. Booking fees, tax)
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              P {total}
            </Typography>
          </Box>
        </Box>
      </PaymentCard>
      <PaymentCard title="Visit date and time">
        <Typography variant="body1">
          Visit dates and times must be entered up to your second choice.
          Spreading out dates and times will increase your reservation rate.
        </Typography>
        <FormControl variant="standard" fullWidth>
          <Box sx={{ width: "100%" }}>
            <Typography variant="body1">First choice</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // disabled={edittingSection !== sectionName}
                slotProps={{
                  textField: {
                    // helperText: errorMessages.birthday,
                    variant: "standard",
                  },
                }}
                sx={{ width: "100%" }}
                value={dayjs(firstChoiceDate)}
                onChange={(date) => setFirstChoiceDate(date)}
              />
            </LocalizationProvider>
          </Box>
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <Box sx={{ width: "100%" }}>
            <Typography variant="body1">Second choice</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // disabled={edittingSection !== sectionName}
                slotProps={{
                  textField: {
                    // helperText: errorMessages.birthday,
                    variant: "standard",
                  },
                }}
                sx={{ width: "100%" }}
                value={dayjs(secondChoiceDate)}
                onChange={(date) => setSecondChoiceDate(date)}
              />
            </LocalizationProvider>
          </Box>
        </FormControl>
      </PaymentCard>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "100px",
            color: "common.white",
            backgroundColor: "primary.light",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "100px",
            color: "common.white",
            backgroundColor: "secondary.main",
          }}
          onClick={handleAccept}
        >
          Accept
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;
