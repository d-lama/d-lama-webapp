import { IonContent, IonPage } from "@ionic/react";
import { HeaderDesktop } from "../../components/header/HeaderDesktop";
import RegistrationForm from "./RegistrationForm";

export default function RegistrationDesktop(props: any) {
  const formStyle = { width: "80%", maxWidth: "600px" };
  const formClass = "custom-border";

  return (
    <>
      {props.isSettings ? (
        <RegistrationForm
          props={props}
          formStyle={formStyle}
          formClass={formClass}
        />
      ) : (
        <IonPage>
          <HeaderDesktop />
          <IonContent class={"ion-padding"}>
            <RegistrationForm
              props={props}
              formStyle={formStyle}
              formClass={formClass}
            />
          </IonContent>
        </IonPage>
      )}
    </>
  );
}
