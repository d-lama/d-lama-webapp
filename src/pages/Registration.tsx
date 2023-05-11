import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../App";
import { Button, ButtonType } from "../components/forms/Button";
import { Input, InputType } from "../components/forms/Input";
import { isEmailValid } from "../helper/formHelper";

function Registration() {
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

    console.log(mask);

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
        window.location.href = "/registrationSucceed";
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
      <IonPage>
        <IonHeader class="ion-no-border" mode={"md"}>
          <IonToolbar>
            <IonTitle
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginTop: "60px",
              }}
              className="ion-text-center"
            >
              D-LAMA
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class={"ion-padding"}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <form
              style={{ width: "80%", maxWidth: "400px" }}
              data-testid="registration-form"
              onSubmit={handleSubmit}
            >
              <Input
                name={"lastName"}
                change={handleChange}
                inputName={"Enter Last Name"}
                placeholder={"Muster"}
                helperText={"Enter a valid name"}
                errorText={"Invalid email"}
                inputType={InputType.text}
              />
              <Input
                name={"firstName"}
                change={handleChange}
                inputName={"Enter First Name"}
                placeholder={"Max"}
                helperText={"Enter a valid name"}
                errorText={"Invalid email"}
                inputType={InputType.text}
              />
              <Input
                name={"birthDate"}
                change={handleChange}
                inputName={"Birthdate"}
                placeholder={""}
                helperText={"Enter a valid birth date"}
                errorText={"Invalid date"}
                inputType={InputType.date}
              />
              <Input
                name={"email"}
                change={handleChange}
                inputName={"Enter Email"}
                placeholder={"max.muster@gmail.com"}
                helperText={"Enter a valid email"}
                errorText={"Invalid password"}
                inputType={InputType.email}
              />
              <Input
                name={"password"}
                change={handleChange}
                inputName={"Enter Password"}
                placeholder={"**************"}
                helperText={"Enter a valid password"}
                errorText={"Invalid password"}
                inputType={InputType.password}
              />
              <Input
                name={"confirmPassword"}
                change={handleChange}
                inputName={"Confirm Password"}
                placeholder={"**************"}
                helperText={"Confirm the password"}
                errorText={"Invalid password"}
                inputType={InputType.password}
              />
              <IonSegment onIonChange={handleIsAdminChange}>
                <IonSegmentButton value="labeler">
                  <IonLabel>Labeler</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="admin">
                  <IonLabel>Administrator</IonLabel>
                </IonSegmentButton>
              </IonSegment>
              <IonItem id="{{error}}" style={{ marginBottom: "15px" }}>
                {labelText && (
                  <IonLabel className="ion-text-center" color="danger">
                    {labelText}
                  </IonLabel>
                )}
              </IonItem>
              <Button
                data-testid="register-button"
                buttonText={"Register"}
                buttonType={ButtonType.submit}
                color={"primary"}
              ></Button>
            </form>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Registration;
