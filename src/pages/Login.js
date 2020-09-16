import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LOGIN_URL } from "../api/constants";
import "../App.css";

// +++++++++++++ MaterialUI code +++++++++++++++++++
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import UserContext from "../context/UserContext";
// +++++++++++++ MaterialUI code +++++++++++++++++++

// +++++++++++++ MaterialUI code +++++++++++++++++++
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://github.com/AtomicZero">
        AtomicZero Inc.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = () => {
  const classes = useStyles();

  // +++++++++++++ MaterialUI code +++++++++++++++++++

  // export const Login = () => {
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      console.log(data);

      setUser(data);
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage("Something went wrong with our servers!");
      }
    }
  };

  return (
    <>
      {/* // +++++++++++++ MaterialUI code +++++++++++++++++++ */}
      {/* <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              input
              type="email"
              value={email}
              onChange={onEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              Link
              to="/welcome"
            >
              Sign In
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container> */}
      {/* // +++++++++++++ MaterialUI code +++++++++++++++++++ */}

      <div>
        <input type="email" value={email} onChange={onEmailChange} />
        <input type="password" value={password} onChange={onPasswordChange} />
        <button onClick={onSubmit}>
          <Link to="/welcome">Submit</Link>
        </button>
      </div>
      {statusMessage && <small>{statusMessage}</small>}
    </>
  );
};
