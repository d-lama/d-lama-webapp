import { IonButton } from "@ionic/react";
import React from "react";

export enum ButtonType {
  button = "button",
  submit = "submit",
}

export interface ButtonProps {
  toolTipText?: string;
  buttonText: string;
  buttonType?: ButtonType | ButtonType.button;
  color?: string | "primary";
  link?: string;
  action?: any;
  children?: any;
}

export function Button(props: ButtonProps) {
  return (
    <IonButton
      title={props.toolTipText}
      routerLink={props.link}
      type={props.buttonType}
      size="large"
      className="ion-text-center"
      expand="block"
      shape="round"
      style={{ marginBottom: "10px", minWidth: "260px" }}
      color={props.color}
      onClick={props.action}
    >
      {props.buttonText}
      {props.children}
    </IonButton>
  );
}
