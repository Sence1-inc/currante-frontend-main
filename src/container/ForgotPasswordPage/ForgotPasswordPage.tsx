import CloseIcon from '@mui/icons-material/Close'
import {
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  Box
} from '@mui/material'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authPageStyles from '../../styles/authPageStyles'

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
  })

  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  function handleEmail(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      email: inputValue,
    }))
  }

  function handleCredentials() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(userCredentials.email)
    const isPasswordValid = undefined 

    if (!isValidEmail && !isPasswordValid) {
      setOpen(true)
    } else {
      navigate('/forgot-verify-email')
    }
  }

  const handleClose = (_event: React.SyntheticEvent | Event) => {
    setOpen(false)
  }

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  )

  return (
    <Box sx={authPageStyles.container.mainContainer}>
      <Box  sx={authPageStyles.container.innerContainer}>
        <Typography sx={authPageStyles.form.heading}>
          Forgot Password
        </Typography>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Enter Correct Email Address"
          action={action}
          sx={{ marginTop: '60px' }}
        />
        <Box sx={[authPageStyles.container.buttonsContainer, { gap: '5px', marginTop: '20px'}]}>
          <Typography sx={authPageStyles.form.formSimpleText}>Account Verification Required</Typography>
          <Typography sx={authPageStyles.form.formHighlightText}>Enter your Email to receive a verification</Typography>
        </Box>
        <TextField
          onChange={(e) => handleEmail(e.target.value)}
          value={userCredentials.email}
          type="email"
          id="email"
          label="Email Address"
          placeholder="Enter Your Email Address"
          sx={authPageStyles.form.formInput}
          InputProps={{ 
            sx: authPageStyles.form.formInputProp,
          }}
          InputLabelProps={{
            sx: authPageStyles.form.formInputLabel,
            shrink: true,
          }}
        />
        <Box sx={authPageStyles.container.buttonsContainer}>
          <Button
            onClick={handleCredentials}
            variant="contained"
            color="primary"
            sx={authPageStyles.form.formButton}>
            Send Code
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ForgotPasswordPage