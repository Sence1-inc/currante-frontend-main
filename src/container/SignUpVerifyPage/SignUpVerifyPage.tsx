import CloseIcon from '@mui/icons-material/Close'
import {
  Button,
  IconButton,
  Link as MuiLink,
  Snackbar,
  TextField,
  Typography,
  Box
} from '@mui/material'
import { Fragment, useState } from 'react'

import { Link as RouterLink, useNavigate, useLocation} from 'react-router-dom'
import authPageStyles from '../../styles/authPageStyles'

interface SignUpVerifyPageProps {}

const SignUpVerifyPage: React.FC<SignUpVerifyPageProps> = () => {
  const [userVerifyCode, setUserVerifyCode] = useState({
    verifyCode: '',
  })

  const [snackBarState, setSnackBarState] = useState({
    state: false,
    snackBarMessage: '',
    vertical: "top",
    horizontal: "center"
  })

  const { vertical, horizontal } = snackBarState;

  const navigate = useNavigate()
  const location = useLocation();
  console.log(location)

  function handleVerifyCode(inputValue: string) {
    setUserVerifyCode((prevUserCode) => ({
      ...prevUserCode,
      verifyCode: inputValue,
    }))
  }

  function handleSubmitVerifyCode() {
    const isValidCode = userVerifyCode.verifyCode.length > 5

    if (!isValidCode) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: 'Please enter correct code',
      }))
    }
    else {
      navigate('/verify-complete')
    }
  }

  const handleClose = (_event: React.SyntheticEvent | Event) => {
    setSnackBarState((prevState) => ({
      ...prevState,
      state: false,
    }))
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
      <Box sx={authPageStyles.container.innerContainer}>
        <Typography sx={authPageStyles.form.heading}>
          Verify Email
        </Typography>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarState.state}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackBarState.snackBarMessage}
          action={action}
          key={vertical + horizontal}
          sx={{ marginTop: '60px' }}
        />
        <Box sx={[authPageStyles.container.buttonsContainer, { gap: '5px', marginTop: '20px'}]}>
          <Typography sx={authPageStyles.form.formSimpleText}>Enter Code Digits to Verify</Typography>
          <Typography sx={authPageStyles.form.formHighlightText}>Please check the code digits sent to your</Typography>
          <Typography sx={authPageStyles.form.formHighlightText}>email: sample@test.com</Typography>
        </Box>
        <TextField
          onChange={(e) => handleVerifyCode(e.target.value)}
          type="string"
          id="verifyCode"
          label="Enter Code"
          placeholder="Enter the code sent to your email"
          sx={authPageStyles.form.formInput}
          InputProps={{ 
            sx: authPageStyles.form.formInputProp,
          }}
          InputLabelProps={{
            sx: authPageStyles.form.formInputLabel,
            shrink: true,
          }}
        />
        <Box sx={[authPageStyles.container.buttonsContainer, { gap: '5px', marginTop: '20px'}]}>
        <MuiLink
          component={RouterLink}
          to="/sign-in"
          underline="none"
          variant="body1"
          sx={authPageStyles.form.formSignUpLink}
        >
          Resend Code
        </MuiLink>
        </Box>
        <Box sx={authPageStyles.container.buttonsContainer}>
          <Button
            onClick={handleSubmitVerifyCode}
            variant="contained"
            color="primary"
            sx={authPageStyles.form.formButton}>
            Verify
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpVerifyPage