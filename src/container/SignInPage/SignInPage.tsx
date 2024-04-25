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

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  })

  const [open, setOpen] = useState(false)

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

  function handleCredentials() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(userCredentials.email)
    const isPasswordValid = undefined 

    if (!isValidEmail && !isPasswordValid) {
      setOpen(true)
    } else {
      navigate('/job-list')
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
          Sign-in
        </Typography>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Password and email Incorrect"
          action={action}
          sx={{ marginTop: '60px' }}


        />
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
        <TextField
          onChange={(e) => handlePassword(e.target.value)}
          value={userCredentials.password}
          type="password"
          id="Password"
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
        <Box sx={authPageStyles.container.buttonsContainer}>
          <Button
            onClick={handleCredentials}
            variant="contained"
            color="primary"
            sx={authPageStyles.form.formButton}>
            Sign In
          </Button>
          <MuiLink
              underline="none"
              to="/forgot-password" 
              component={RouterLink}
              sx={authPageStyles.form.formLink}>
              Forgot password?
            </MuiLink>
        </Box>
        <Box sx={[authPageStyles.container.buttonsContainer, { gap: '5px', marginTop: '50px'}]}>
          <Typography sx={authPageStyles.form.formSimpleText}>Don’t have an account?</Typography>
          <MuiLink
            component={RouterLink}
            to="/sign-up"
            underline="none"
            variant="body1"
            sx={authPageStyles.form.formSignUpLink}
          >
            Sign Up
          </MuiLink>
        </Box>
      </Box>
    </Box>
  )
}

export default SignInPage