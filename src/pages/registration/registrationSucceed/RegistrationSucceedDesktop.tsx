import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Button, ButtonType } from "../../../components/forms/Button";
import { HeaderDesktop } from "../../../components/header/HeaderDesktop";
import "./RegistrationSucceed.css";
import lama3 from "./lama3.jpg";

export default function RegistrationSucceedDesktop() {
  return (
    <>
      <IonPage>
        <HeaderDesktop />
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
            <div className={"custom-border"} style={{ maxWidth: "500px" }}>
              <>
                <IonAvatar className="item-avatar">
                  <img src={lama3} alt="Lama" />
                </IonAvatar>
              </>
              <IonItem style={{ marginBottom: "15px" }}>
                <IonLabel className="ion-text-center" color="secondary">
                  Registration succeeded
                </IonLabel>
              </IonItem>
              <Button
                link={"/login"}
                buttonText={"LOGIN NOW"}
                buttonType={ButtonType.button}
                color="secondary"
              ></Button>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
