import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { REGISTER_URL } from "../api/constants";

export const Register = () => {
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

  return (
    <>
      <div>
        <h2>Register</h2>
        <input type="email" value={email} onChange={onEmailChange} />
        <input type="password" value={password} onChange={onPasswordChange} />
        <input type="password" value={password} onChange={onFirstNameChange} />
        <input type="password" value={password} onChange={onsetLastNameChange} />
        <button onClick={onSubmit}>Submit</button>
      </div>
      {statusMessage && <small>{statusMessage}</small>}
      <div>
        {registrationSuccess && <Link to="/login">Go to login here!</Link>}
      </div>
    </>
  );
};