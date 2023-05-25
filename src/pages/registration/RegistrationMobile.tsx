import { IonContent, IonPage } from "@ionic/react";
import { HeaderMobile } from "../../components/header/HeaderMobile";
import RegistrationForm from "./RegistrationForm";

export default function RegistrationMobile(props: any) {
  const formStyle = { width: "80%", maxWidth: "400px" };

  return (
    <>
      {props.isSettings ? (
        <RegistrationForm props={props} formStyle={formStyle} />
      ) : (
        <IonPage>
          <HeaderMobile />
          <IonContent class={"ion-padding"}>
            <RegistrationForm props={props} formStyle={formStyle} />
          </IonContent>
        </IonPage>
      )}
    </>
  );
}
