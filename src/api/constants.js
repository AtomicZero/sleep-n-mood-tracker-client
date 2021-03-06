export const BASE_URL = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://limitless-waters-62037.herokuapp.com";

export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;