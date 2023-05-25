import { IonContent, IonIcon, IonItem, IonLabel, IonPage } from "@ionic/react";
import { logInOutline, personAddOutline } from "ionicons/icons";
import { Button, ButtonType } from "../../components/forms/Button";
import { Input, InputType } from "../../components/forms/Input";
import { HeaderMobile } from "../../components/header/HeaderMobile";
import "./Login.css";
import lama5 from "./lama5.jpg";

export default function LoginMobile(props: any) {
  return (
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
          className="login"
        >
          <img src={lama5} />
          <form
            style={{ width: "80%", maxWidth: "400px" }}
            onSubmit={props.handleLogin}
          >
            <Input
              name={"email"}
              inputName={"Email"}
              change={props.handleChange}
              placeholder={"max.muster@gmail.com"}
              errorText={"Invalid email"}
              inputType={InputType.email}
            />
            <Input
              name={"password"}
              inputName={"Password"}
              change={props.handleChange}
              placeholder={"**************"}
              errorText={"error"}
              inputType={InputType.password}
            />

            {props.errorText && (
              <IonItem id="{{error}}" style={{ marginBottom: "20px" }}>
                <IonLabel className="ion-text-center" color="warning">
                  {props.errorText}
                </IonLabel>
              </IonItem>
            )}

            {props.responseText && (
              <IonItem id="{{error}}" style={{ marginBottom: "20px" }}>
                <IonLabel className="ion-text-center" color="danger">
                  {props.responseText}
                </IonLabel>
              </IonItem>
            )}

            <Button
              buttonType={ButtonType.submit}
              buttonText={"Login"}
              color={"primary"}
            >
              <IonIcon slot="end" icon={logInOutline}></IonIcon>
            </Button>
            <Button
              link={"/registration"}
              buttonText={"Sign Up"}
              buttonType={ButtonType.button}
              color={"primary"}
            >
              <IonIcon slot="end" icon={personAddOutline}></IonIcon>
            </Button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}
