import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Button, ButtonType } from "../../components/forms/Button";
import { Input, InputType } from "../../components/forms/Input";
import "./LoginDesktop.css";

export default function LoginDesktop(props: any) {
  return (
    <IonPage>
      <IonHeader mode={"md"}>
        <IonToolbar>
          <IonTitle
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "20px",
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
            className={"custom-border"}
            style={{ width: "80%", maxWidth: "600px" }}
            onSubmit={props.handleLogin}
          >
            <Input
              name={"email"}
              inputName={"Email"}
              change={props.handleChange}
              placeholder={"max.muster@gmail.com"}
              helperText={"Enter a valid email"}
              errorText={"Invalid email"}
              inputType={InputType.email}
            />
            <Input
              name={"password"}
              inputName={"Password"}
              change={props.handleChange}
              placeholder={"**************"}
              helperText={"Enter a valid password"}
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
                color={"success"}
              ></Button>
              <Button
                link={"/registration"}
                buttonText={"Sign Up"}
                buttonType={ButtonType.button}
                color={"success"}
              ></Button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}
