import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { initializeOrder } from "../../redux/reducers/OrderReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Order } from "../../redux/type";
import jobListStyles from "../../styles/jobListStyles";

interface TabButtonProps {
  status: string;
  order: Order;
  handleOpenModal: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  status,
  handleOpenModal,
  order,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const requestButton = () => {
    return (
      <Button
        disabled={status != "1" && true}
        onClick={handleOpenModal}
        sx={jobListStyles.button.simple}
      >
        <CheckIcon
          color="primary"
          sx={[
            jobListStyles.icon.buttonIconBlue,
            status != "1" && jobListStyles.icon.buttonIconDisabled,
          ]}
        />
        Accept
      </Button>
    );
  };

  const incomingButton = () => {
    return (
      <Button
        disabled={
          (status == "1" ||
            status == "3" ||
            status == "4" ||
            status == "5" ||
            status == "6" ||
            status == "7") &&
          true
        }
        onClick={handleOpenModal}
        sx={jobListStyles.button.simple}
      >
        <MyLocationIcon
          sx={[
            jobListStyles.icon.buttonIconBlue,
            (status == "1" ||
              status == "3" ||
              status == "4" ||
              status == "5" ||
              status == "6" ||
              status == "7") &&
              jobListStyles.icon.buttonIconDisabled,
          ]}
        />
        Arrived at Location
      </Button>
    );
  };

  const completedButton = () => {
    return (
      <Button
        disabled={
          (status == "1" ||
            status == "2" ||
            status == "4" ||
            status == "5" ||
            status == "6" ||
            status == "7") &&
          true
        }
        onClick={handleOpenModal}
        sx={jobListStyles.button.simple}
      >
        <DoneAllIcon
          sx={[
            jobListStyles.icon.buttonIconBlue,
            (status == "1" ||
              status == "2" ||
              status == "4" ||
              status == "5" ||
              status == "6" ||
              status == "7") &&
              jobListStyles.icon.buttonIconDisabled,
          ]}
        />
        Work Completed
      </Button>
    );
  };

  const reviewEmployerButton = () => {
    return (
      <Button
        disabled={
          (status == "1" ||
            status == "2" ||
            status == "3" ||
            order.payment_approval_date !== null ||
            status == "7") &&
          true
        }
        onClick={() => {
          dispatch(initializeOrder(order));
          navigate(`/reviews/${order.employer_id}`);
        }}
        sx={jobListStyles.button.simple}
      >
        <ReviewsIcon
          sx={[
            jobListStyles.icon.buttonIconBlue,
            (status == "1" ||
              status == "2" ||
              status == "3" ||
              order.payment_approval_date !== null ||
              status == "7") &&
              jobListStyles.icon.buttonIconDisabled,
          ]}
        />
        Review
      </Button>
    );
  };

  const reviewWorkerButton = () => {
    return (
      <Button
        disabled={
          (status == "1" || status == "2" || status == "3" || status == "6") &&
          true
        }
        onClick={() => {
          dispatch(initializeOrder(order));
          navigate(`/reviews/${order.worker_id}`);
        }}
        sx={jobListStyles.button.simple}
      >
        <ReviewsIcon
          sx={[
            jobListStyles.icon.buttonIconBlue,
            (status == "1" ||
              status == "2" ||
              status == "3" ||
              status == "6") &&
              jobListStyles.icon.buttonIconDisabled,
          ]}
        />
        Review
      </Button>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent:
          user.logged_in_as === "worker" ? "space-between" : "center",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      {user.logged_in_as === "employer" ? (
        <Box>{reviewWorkerButton()}</Box>
      ) : (
        <>
          <Box>{incomingButton()}</Box>
          <Box>{completedButton()}</Box>
          <Box>{requestButton()}</Box>
          <Box>{reviewEmployerButton()}</Box>
        </>
      )}
    </Box>
  );
};

export default TabButton;
