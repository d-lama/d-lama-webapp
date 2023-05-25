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
import RegistrationForm from "./RegistrationForm";

export default function RegistrationDesktop(props: any) {
  const formStyle = { width: "80%", maxWidth: "600px" };
  const formClass = "custom-border";

  return (
    <>
      <IonPage>
        {props.isSettings ? "" :
        <HeaderDesktop />
        }
        <IonContent class={"ion-padding"}>
          <RegistrationForm props={props} formStyle={formStyle} formClass={formClass} />
        </IonContent>
      </IonPage>
    </>
  );
}
