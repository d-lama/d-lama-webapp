import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { API_URL, MIN_DESKTOP_WIDTH } from "../../App";
import { isEmailValid } from "../../helper/formHelper";
import RegistrationDesktop from "./RegistrationDesktop";
import RegistrationMobile from "./RegistrationMobile";

export default function Registration() {
  const isDesktop = window.innerWidth >= MIN_DESKTOP_WIDTH;
  const history = useHistory();
  const [labelText, setLabelText] = useState("");
  const [mask, setMask] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    isAdmin: false,
  });

  function handleChange(e: { target: { name: any; value: any } }) {
    setMask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleIsAdminChange(e: any) {
    if (e.detail.value === undefined) return;
    let isAdminValue = e.detail.value === "admin";
    setMask((prev) => ({ ...prev, isAdmin: isAdminValue }));
  }

  const handleSubmit = function (e: React.SyntheticEvent) {
    e.preventDefault();
    if (!isEmailValid(mask.email)) {
      setLabelText("Invalid email!");
      return;
    }
    if (mask.password !== mask.confirmPassword) {
      setLabelText("Confirm password is not the same!");
      return;
    }
    axios
      .post(API_URL + "/user", {
        firstName: mask.firstName,
        lastName: mask.lastName,
        email: mask.email,
        password: mask.password,
        confirmPassword: mask.confirmPassword,
        birthDate: mask.birthDate,
        isAdmin: mask.isAdmin,
      })
      .then(() => {
        history.push("/registration/succeed");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setLabelText(error.message);
        } else {
          setLabelText("Connection failed!");
          setTimeout(() => {
            setLabelText("");
          }, 3000);
        }
      });
  };

  return (
    <>
      (
      <div>
        {isDesktop ? (
          <RegistrationDesktop
            mask={mask}
            handleChange={handleChange}
            handleLogin={handleSubmit}
            handleIsAdminChange={handleIsAdminChange}
            labelText={labelText}
          />
        ) : (
          <RegistrationMobile
            mask={mask}
            handleChange={handleChange}
            handleLogin={handleSubmit}
            handleIsAdminChange={handleIsAdminChange}
            labelText={labelText}
          />
        )}
      </div>
      );
    </>
  );
}
