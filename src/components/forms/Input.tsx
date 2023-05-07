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
    name?: string,
    inputType: InputType,
    inputName: string,
    placeholder?: string,
    change?: any
    helperText?: string,
    errorText: string,

}

export function Input(props: InputProps) {
    return (
        <IonItem fill="outline" style={{marginTop: '15px'}} shape='round' mode={"md"}>
            <IonLabel className="ion-text-center" position="floating">{props.inputName}</IonLabel>
            <IonInput
                className="ion-text-center"
                name={props.name}
                type={props.inputType}
                placeholder={props.placeholder}
                onIonChange={props.change}
            ></IonInput>
            <IonNote slot="helper">{props.helperText}</IonNote>
            <IonNote slot="error">{props.errorText}</IonNote>
        </IonItem>
    )
}
