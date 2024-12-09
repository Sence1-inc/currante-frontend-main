import {
  Button,
  Typography,
  Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import authPageStyles from '../../styles/authPageStyles'

interface SignUpVerifyPageProps {}

const SignUpComplete: React.FC<SignUpVerifyPageProps> = () => {

  const navigate = useNavigate()

  return (
    <Box sx={authPageStyles.container.mainContainer}>
      <Box sx={authPageStyles.container.innerContainer}>
        <Typography sx={authPageStyles.form.heading}>
          Thank you for signing up!
        </Typography>
        <Box sx={[authPageStyles.container.buttonsContainer, { gap: '5px', marginTop: '20px'}]}>
          <Typography sx={authPageStyles.form.formSimpleText}>Your account has been verified</Typography>
          <Typography sx={authPageStyles.form.formHighlightText}>Welcome to Currante!</Typography>
        </Box>
        <Box sx={authPageStyles.container.buttonsContainer}>
          <Button
            onClick={() => navigate('/jobs')}
            variant="contained"
            color="primary"
            sx={authPageStyles.form.formButton}>
            Start Currante
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpComplete