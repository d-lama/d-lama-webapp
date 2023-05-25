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
import { Button, ButtonType } from "../../../components/forms/Button";
import { HeaderMobile } from "../../../components/header/HeaderMobile";
import lama2 from "./lama2.jpg";

export default function RegistrationSucceedMobile() {
  return (
    <>
      <IonPage>
        <HeaderMobile />
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
            <div>
              <>
                <IonAvatar className="item-avatar">
                  <img src={lama2} alt="Lama" />
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
