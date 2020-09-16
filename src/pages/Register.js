import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { REGISTER_URL } from "../api/constants";
import '../App.css';

// +++++++++++++++++MaterialUI Start Block++++++++++++++++++++
// import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// +++++++++++++++++MaterialUI End Block++++++++++++++++++++

// +++++++++++++++++MaterialUI Start Block++++++++++++++++++++
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://github.com/AtomicZero">
        AtomicZero Inc.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    color: 'white'
  },
}));
// +++++++++++++++++MaterialUI End Block++++++++++++++++++++


export const Register = () => {
  const classes = useStyles();

  // export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const onsetLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const onSubmit = async () => {
    const {
      data: { success, message },
    } = await axios.post(REGISTER_URL, {
      email,
      password,
      firstName,
      lastName,
    });

    if (success) {
      setRegistrationSuccess(true);
    }

    setStatusMessage(message);
  };

  // +++++++++++++++++MaterialUI Start Block++++++++++++++++++++
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
      </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                input type="firstName" 
                value={firstName} 
                onChange={onFirstNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                input type="lastName" 
                value={lastName} 
                onChange={onsetLastNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                input type="email" 
                value={email} 
                onChange={onEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // input type="password" 
                value={password} 
                onChange={onPasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
        </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
            </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      {statusMessage && <small>{statusMessage}</small>}
      {registrationSuccess && <Link to="/login">Go to login here!</Link>}
    </Container>
  );
}
// +++++++++++++++++MaterialUI End Block++++++++++++++++++++



//   return (
//     <>
//       <div>
//         <h2>Register</h2>
//         <input type="email" value={email} onChange={onEmailChange} />
//         <input type="password" value={password} onChange={onPasswordChange} />
//         <input type="password" value={password} onChange={onFirstNameChange} />
//         <input type="password" value={password} onChange={onsetLastNameChange} />
//         <button onClick={onSubmit}>Submit</button>
//       </div>
//       {statusMessage && <small>{statusMessage}</small>}
//       <div>
//         {registrationSuccess && <Link to="/login">Go to login here!</Link>}
//       </div>
//     </>
//   );
// };


