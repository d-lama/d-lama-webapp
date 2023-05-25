import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { Button, ButtonType } from "../../components/forms/Button";
import { Input, InputType } from "../../components/forms/Input";
import { HeaderDesktop } from "../../components/header/HeaderDesktop";
import "./LoginDesktop.css";
import lama5 from "./lama5.jpg";

export default function LoginDesktop(props: any) {
  return (
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
          <IonAvatar className="item-avatar-login">
            <img src={lama5} alt="Lama" />
          </IonAvatar>
          <form
            className={""}
            style={{ width: "80%", maxWidth: "600px" }}
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                buttonType={ButtonType.submit}
                buttonText={"Login"}
                color={"primary"}
              ></Button>
              <Button
                link={"/registration"}
                buttonText={"Sign Up"}
                buttonType={ButtonType.button}
                color={"primary"}
              ></Button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}
