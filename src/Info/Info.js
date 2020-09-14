import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../App";

import { INFO_URL } from "../api/constants";

// This is an example of a route on the api that is going to display data if you're authenticated or not
export const Info = () => {
  const appContext = useContext(AppContext);
  const [info, setInfo] = useState(null);
  const [unauthorisedError, setUnauthorisedError] = useState(null);

  const { user } = appContext;

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { data } = await axios.get(INFO_URL, {
          headers: { authorization: `Bearer ${user.token}` },
        });

        setInfo(data.data.info);
      } catch (error) {
        setUnauthorisedError(error.response.data.message);
      }
    };

    getInfo();

    return () => setUnauthorisedError(null);
  }, [user.token]);

  return (
    <div>
      <h1>Info</h1>

      {info && <p>The Api's wise words of data: {info}</p>}

      {unauthorisedError && (
        <>
          <p>
            Looks like you're not authenticated, login{" "}
            <Link to="/login">here</Link>
          </p>
          <small>Server message: {unauthorisedError}</small>
        </>
      )}
    </div>
  );
};