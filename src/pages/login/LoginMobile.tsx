import { IonContent, IonItem, IonLabel, IonPage } from "@ionic/react";
import { Button, ButtonType } from "../../components/forms/Button";
import { Input, InputType } from "../../components/forms/Input";
import { HeaderMobile } from "../../components/header/HeaderMobile";
import "./Login.css";

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
        >
          <form
            style={{ width: "80%", maxWidth: "400px" }}
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
  );
}
