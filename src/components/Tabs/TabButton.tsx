import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, Button } from "@mui/material";
import jobListStyles from "../../styles/jobListStyles";

interface TabButtonProps {
  status: string;
  handleOpenModal: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ status, handleOpenModal }) => {
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
            (status == "1" || status == "3" || status == "4") &&
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
        disabled={(status == "1" || status == "2" || status == "4") && true}
        onClick={handleOpenModal}
        sx={jobListStyles.button.simple}
      >
        <DoneAllIcon
          sx={[
            jobListStyles.icon.buttonIconBlue,
            (status == "1" || status == "2" || status == "4") &&
              jobListStyles.icon.buttonIconDisabled,
          ]}
        />
        Work Completed
      </Button>
    );
  };

  return (
    <Box sx={jobListStyles.container.buttonsContainer}>
      <Box>{incomingButton()}</Box>
      <Box>{completedButton()}</Box>
      <Box>{requestButton()}</Box>
    </Box>
  );
};

export default TabButton;
