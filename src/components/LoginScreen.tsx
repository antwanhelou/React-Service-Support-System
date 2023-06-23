import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/auth';
import { AppDispatch } from '../Redux/store';
import { CircularProgress } from '@mui/material';
import { link } from 'fs';
import ProblematicReservationsListScreen from './ProblematicReservationsListScreen';
import { useNavigate } from 'react-router-dom';


function LoginScreen(props) {
  const [enteredEmail, setEnteredEmail] = useState(props.email || '');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const emailChangeHandler = (event) => {
    const emailValue = event.target.value;
    setEnteredEmail(emailValue);
    setFormIsValid(emailValue.includes('@') && enteredPassword.trim().length > 6);
  };

  const passwordChangeHandler = (event) => {
    const passwordValue = event.target.value;
    setEnteredPassword(passwordValue);
    setFormIsValid(passwordValue.trim().length > 3 && enteredEmail.includes('@'));
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 3);
  };
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
  
   // Set isLoading to true before dispatching the login action
  
    try {
      const action = await dispatch(login({ username: enteredEmail, password: enteredPassword }));
      console.log('login action', action);
      navigate("/problematic_reservations");
      // Handle the response or perform any necessary actions here
  
      setIsLoading(false); // Set isLoading to false after the login action is complete
    } catch (error) {
      // Handle any errors that occurred during the login process
      setIsLoading(false); // Set isLoading to false in case of an error
    }
  };
  
  
  


  return (
    <Container>
    {isLoading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Securly logging you in
        <CircularProgress />
      </div>
    ) : (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
              error={!emailIsValid}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
              error={!passwordIsValid}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formIsValid}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )}
    </Container>
    
  );
}

export default LoginScreen;
