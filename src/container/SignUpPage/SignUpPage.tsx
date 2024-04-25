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
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import authPageStyles from '../../styles/authPageStyles'

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    password2: '',
  })

  const [snackBarState, setSnackBarState] = useState({
    state: false,
    snackBarMessage: '',
    vertical: "top",
    horizontal: "center"
  })

  const { vertical, horizontal } = snackBarState;

  const navigate = useNavigate()

  function handleEmail(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      email: inputValue,
    }))
  }

  function handlePassword(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password: inputValue,
    }))
  }

  function handlePassword2(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password2: inputValue,
    }))
  }

  function handleSignUp() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(userCredentials.email)
    const isPasswordValid = userCredentials.password.length > 6
    const isPassword2 = userCredentials.password === userCredentials.password2

    if (!isValidEmail || !userCredentials.email) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: 'Please provide a valid email address.',
      }))
    } else if (!isPasswordValid) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: 'Please provide a valid password.',
      }))
    } else if (!isPassword2) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: 'Password does not match.',
      }))
    } else {
      navigate('/verify-email')
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
      <Box  sx={authPageStyles.container.innerContainer}>
        <Typography sx={authPageStyles.form.heading}>
          Sign-up
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
        <TextField
          onChange={(e) => handleEmail(e.target.value)}
          type="email"
          id="email"
          label="Email address"
          placeholder="Enter Your Preferred Email Address"
          sx={authPageStyles.form.formInput}
          InputProps={{ 
            sx: authPageStyles.form.formInputProp,
          }}
          InputLabelProps={{
            sx: authPageStyles.form.formInputLabel,
            shrink: true,
          }}
        />
        <TextField
          onChange={(e) => handlePassword(e.target.value)}
          type="password"
          id="password"
          label="Password"
          placeholder="Enter Your Password"
          sx={authPageStyles.form.formInput}
          InputProps={{ 
            sx: authPageStyles.form.formInputProp,
          }}
          InputLabelProps={{
            sx: authPageStyles.form.formInputLabel,
            shrink: true,
          }}
        />
        <TextField
          onChange={(e) => handlePassword2(e.target.value)}
          type="password"
          id="password2"
          label="Confirm Password"
          placeholder="Reenter Your Password"
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
            onClick={handleSignUp}
            variant="contained"
            color="primary"
            sx={authPageStyles.form.formButton}>
            Sign Up
          </Button>
        </Box>
      </Box>
      <Box sx={[authPageStyles.container.buttonsContainer, { gap: '5px', marginTop: '20px'}]}>
        <Typography sx={authPageStyles.form.formSimpleText}>Alreay have an account?</Typography>
        <MuiLink
          component={RouterLink}
          to="/sign-in"
          underline="none"
          variant="body1"
          sx={authPageStyles.form.formSignUpLink}
        >
          Sign In
        </MuiLink>
      </Box>
    </Box>
  )
}

export default SignUpPage