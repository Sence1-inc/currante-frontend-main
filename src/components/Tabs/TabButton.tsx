import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, Button } from "@mui/material";
import jobListStyles from "../../styles/jobListStyles";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useNavigate } from "react-router";
import { Order } from "../../redux/type";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { initializeOrder } from "../../redux/reducers/OrderReducer";

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
        sx={jobListStyles.button.primary}
      >
        <CheckIcon sx={jobListStyles.icon.buttonIconWhite} />
        Accept
      </Button>
    );
  };

  const incomingButton = () => {
    return (
      <Button
        disabled={(status == "1" || status == "3" || status == "4") && true}
        onClick={handleOpenModal}
        sx={jobListStyles.button.simple}
      >
        <MyLocationIcon
          sx={[
            jobListStyles.icon.buttonIconBlue,
            (status == "1" ||
              status == "3" ||
              status == "4" ||
              status == "5") &&
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
          (status == "1" || status == "2" || status == "4" || status == "5") &&
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
              status == "5") &&
              jobListStyles.icon.buttonIconDisabled,
          ]}
        />
        Work Completed
      </Button>
    );
  };

  const reviewButton = () => {
    return (
      <Button
        disabled={(status == "1" || status == "2" || status == "3") && true}
        onClick={() => {
          dispatch(initializeOrder(order));
          if (user.logged_in_as == "worker") {
            navigate(`/reviews/${order.employer_id}`);
          } else {
            navigate(`/reviews/${order.worker_id}`);
          }
        }}
        sx={jobListStyles.button.simple}
      >
        <ReviewsIcon
          sx={[
            jobListStyles.icon.buttonIconBlue,
            (status == "1" ||
              status == "2" ||
              status == "3" ||
              status == "5") &&
              jobListStyles.icon.buttonIconDisabled,
          ]}
        />
        Review
      </Button>
    );
  };

  return (
    <Box sx={jobListStyles.container.buttonsContainer}>
      <Box>{incomingButton()}</Box>
      <Box>{completedButton()}</Box>
      <Box>{requestButton()}</Box>
      <Box>{reviewButton()}</Box>
    </Box>
  );
};

export default TabButton;
