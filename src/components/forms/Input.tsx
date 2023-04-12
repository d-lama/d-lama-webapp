import {IonInput, IonItem, IonLabel, IonNote} from "@ionic/react";
import React from "react";

export enum InputType {
    email = "email",
    number = "number",
    password = "password",
    text = "text",
    url = "url",
}

export interface InputProps {
    inputName: string,
    placeholder: string,
    helperText: string,
    errorText: string
    inputType: InputType
}

export function Input(props: InputProps) {
    return (
        <IonItem fill="outline" style={{marginTop: '15px'}} shape='round' mode={"md"}>
            <IonLabel className="ion-text-center" position="floating">{props.inputName}</IonLabel>
            <IonInput className="ion-text-center" type={props.inputType}
                      placeholder={props.placeholder}></IonInput>
            <IonNote slot="helper">{props.helperText}</IonNote>
            <IonNote slot="error">{props.errorText}</IonNote>
        </IonItem>
    )
}
