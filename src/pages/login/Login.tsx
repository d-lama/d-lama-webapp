import axios from "axios";
import { decodeJwt } from "jose";
import React, { useState } from "react";
import { API_URL, MIN_DESKTOP_WIDTH } from "../../App";
import { isEmailValid } from "../../helper/formHelper";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import "./Login.css";
import LoginDesktop from "./LoginDesktop";
import LoginMobile from "./LoginMobile";

interface IJwtData {
  UserId: string;
  name: string;
  email: string;
  jti: string;
  IsAdmin: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export default function Login() {
  const isDesktop = window.innerWidth >= MIN_DESKTOP_WIDTH;
  const { setToken } = useAuthStore();
  const { setUser } = useUserStore();
  const [errorText, setErrorText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [mask, setMask] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: { target: { name: any; value: any } }) {
    if (e.target.name === null) return;
    setMask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleLogin = function (e: React.SyntheticEvent) {
    e.preventDefault();

    if (!isEmailValid(mask.email)) {
      setErrorText("Format of email is not valid");
      return;
    }

    axios
      .post(API_URL + "/user/authToken", {
        email: mask.email,
        password: mask.password,
      })
      .then((res) => {
        setToken(res.data);
        return res.data;
      })
      .then((token) => {
        let decodedData = decodeJwt(token) as unknown as IJwtData;
        if (decodedData == null || decodedData == undefined) {
          setResponseText("An error occurred processing the request");
          return;
        }
        setUser({
          userId: Number(decodedData.UserId),
          email: decodedData.email,
          name: decodedData.name,
          isAdmin: decodedData.IsAdmin === "True" ? true : false,
          isAuthenticated: true,
        });
      })
      .catch((error) => {
        setResponseText(error.response.data);
      });
  };

  return (
    <>
      {isDesktop ? (
        <LoginDesktop
          mask={mask}
          handleChange={handleChange}
          handleLogin={handleLogin}
          responseText={responseText}
          errorText={errorText}
        />
      ) : (
        <LoginMobile
          mask={mask}
          handleChange={handleChange}
          handleLogin={handleLogin}
          responseText={responseText}
          errorText={errorText}
        />
      )}
    </>
  );
}
