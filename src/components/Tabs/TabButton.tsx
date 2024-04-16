import { Box, Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import jobListStyles from "../../styles/jobListStyles";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface TabButtonProps {
  status: string
  handleOpenModal: () => void,
}

const TabButton: React.FC<TabButtonProps> = ({ status, handleOpenModal }) => {

  const incomingButton = () => {
    return (
      <Button
        disabled={status != 'incoming' && true }
        onClick={handleOpenModal}
        sx={ jobListStyles.button.primary }
      >
        <CheckIcon sx={ jobListStyles.icon.buttonIconWhite} />
        Accept
      </Button>
    )
  }

  const currentButton = () => {
    return (
      <Button
       disabled={status != 'current' && true }
        onClick={handleOpenModal}
        sx={ jobListStyles.button.simple }
      >
        <MyLocationIcon sx={ [jobListStyles.icon.buttonIconBlue, status != 'current' && jobListStyles.icon.buttonIconDisabled] } />
        Arrived at Location
      </Button>
    )
  }

  const completedButton = () => {
    return (
      <Button 
        disabled={status != 'completed' && true }
        onClick={handleOpenModal}
        sx={ jobListStyles.button.simple }
      >
        <DoneAllIcon sx={ [jobListStyles.icon.buttonIconBlue, status != 'completed' && jobListStyles.icon.buttonIconDisabled] } />
        Work Completed
      </Button>
    )
  }

  return (
    <Box sx={ jobListStyles.container.buttonsContainer }>
      <Box>
        {currentButton()}
      </Box>
      <Box>
        {completedButton()}
      </Box>
      <Box>
        {incomingButton()}
      </Box>
    </Box>
  )
}

export default TabButton;