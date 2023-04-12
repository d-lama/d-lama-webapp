import {IonButton} from "@ionic/react";
import React from "react";


export enum ButtonType {
    button = "button",
    reset = "reset",
    submit = "submit",
}


export interface ButtonProps {
    buttonText:string,
    buttonType: ButtonType
}

export function Button(props: ButtonProps) {
    return (
        <IonButton type={props.buttonType} size="large" className="ion-text-center" expand="block"
                   shape="round"
                   style={{marginBottom: '30px'}}
        >{props.buttonText}
        </IonButton>
    )
}