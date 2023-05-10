import {IonButton} from "@ionic/react";
import React from "react";


export enum ButtonType {
    button = "button",
    submit = "submit",
}


export interface ButtonProps {
    buttonText: string,
    buttonType?: ButtonType | ButtonType.button,
    color?: string | "primary",
    link?: string
}

export function Button(props: ButtonProps) {
    return (
        <IonButton routerLink={props.link} type={props.buttonType} size="large" className="ion-text-center"
                   expand="block"
                   shape="round"
                   style={{marginBottom: '30px', minWidth:'260px'}} color={props.color}
        >{props.buttonText}
        </IonButton>
    )
}