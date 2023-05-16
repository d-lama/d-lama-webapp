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
import React from "react";
import { Button, ButtonType } from "../../components/forms/Button";
import { Input, InputType } from "../../components/forms/Input";
import { HeaderDesktop } from "../../components/header/HeaderDesktop";
import "./RegistrationDesktop.css";

export default function RegistrationDesktop(props: any) {
  return (
    <>
      <IonPage>
        <HeaderDesktop />
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
              className={"custom-border"}
              style={{ width: "80%", maxWidth: "600px" }}
              data-testid="registration-form"
              onSubmit={props.handleLogin}
            >
              <Input
                name={"lastName"}
                change={props.handleChange}
                inputName={"Enter Last Name"}
                placeholder={"Muster"}
                helperText={"Enter a valid name"}
                errorText={"Invalid email"}
                inputType={InputType.text}
              />
              <Input
                name={"firstName"}
                change={props.handleChange}
                inputName={"Enter First Name"}
                placeholder={"Max"}
                helperText={"Enter a valid name"}
                errorText={"Invalid email"}
                inputType={InputType.text}
              />
              <Input
                name={"birthDate"}
                change={props.handleChange}
                inputName={"Birthdate"}
                placeholder={""}
                helperText={"Enter a valid birth date"}
                errorText={"Invalid date"}
                inputType={InputType.date}
              />
              <Input
                name={"email"}
                change={props.handleChange}
                inputName={"Enter Email"}
                placeholder={"max.muster@gmail.com"}
                helperText={"Enter a valid email"}
                errorText={"Invalid password"}
                inputType={InputType.email}
              />
              <Input
                name={"password"}
                change={props.handleChange}
                inputName={"Enter Password"}
                placeholder={"**************"}
                helperText={"Enter a valid password"}
                errorText={"Invalid password"}
                inputType={InputType.password}
              />
              <Input
                name={"confirmPassword"}
                change={props.handleChange}
                inputName={"Confirm Password"}
                placeholder={"**************"}
                helperText={"Confirm the password"}
                errorText={"Invalid password"}
                inputType={InputType.password}
              />
              <IonSegment onIonChange={props.handleIsAdminChange}>
                <IonSegmentButton value="labeler">
                  <IonLabel>Labeler</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="admin">
                  <IonLabel>Administrator</IonLabel>
                </IonSegmentButton>
              </IonSegment>
              {props.labelText && (
                <IonItem id="{{error}}" style={{ marginBottom: "15px" }}>
                  <IonLabel className="ion-text-center" color="danger">
                    {props.labelText}
                  </IonLabel>
                </IonItem>
              )}
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
