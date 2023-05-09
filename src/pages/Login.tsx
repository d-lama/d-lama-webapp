import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../App";
import { Button, ButtonType } from "../components/forms/Button";
import { Input, InputType } from "../components/forms/Input";
import { isEmailValid } from "../helper/formHelper";
import { useUserStore } from "../store/userStore";
import "./Login.css";

export default function Login() {
  const { setToken } = useUserStore.getState();
  const [errorText, setErrorText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [mask, setMask] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: { target: { name: any; value: any } }) {
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
        window.location.href = "/home";
      })
      .catch((error) => {
        setResponseText(error.response.data);
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
        <IonContent>
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
              onSubmit={handleLogin}
            >
              <Input
                name={"email"}
                inputName={"Email"}
                change={handleChange}
                placeholder={"max.muster@gmail.com"}
                helperText={"Enter a valid email"}
                errorText={"Invalid email"}
                inputType={InputType.email}
                required={true}
              />

              <Input
                name={"password"}
                inputName={"Password"}
                change={handleChange}
                placeholder={"**************"}
                helperText={"Enter a valid password"}
                errorText={"error"}
                inputType={InputType.password}
                required={true}
                minLength={10}
              />

              <IonItem id="{{error}}" style={{ marginBottom: "20px" }}>
                {errorText && (
                  <IonLabel className="ion-text-center" color="warning">
                    {errorText}
                  </IonLabel>
                )}

                {responseText && (
                  <IonLabel className="ion-text-center" color="danger">
                    {responseText}
                  </IonLabel>
                )}
              </IonItem>

              <Button
                buttonType={ButtonType.submit}
                buttonText={"Login"}
                color={"primary"}
              ></Button>

              <Button
                link={"/registration"}
                buttonText={"Sign Up"}
                buttonType={ButtonType.button}
              ></Button>
            </form>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
