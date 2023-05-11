import { IonInput, IonItem, IonLabel, IonNote } from "@ionic/react";

export enum InputType {
  email = "email",
  number = "number",
  password = "password",
  text = "text",
  url = "url",
  date = "date",
}

export interface InputProps {
  name?: string;
  inputType: InputType;
  inputName: string;
  placeholder?: string;
  change?: any;
  helperText?: string;
  errorText: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

export function Input(props: InputProps) {
  return (
    <IonInput
      className="ion-text-center"
      name={props.name}
      type={props.inputType}
      placeholder={props.placeholder}
      onIonChange={props.change}
      minlength={props.minLength}
      maxlength={props.maxLength}
      required={props.required}
      helperText={props.helperText}
      errorText={props.errorText}
      labelPlacement="stacked"
      label={props.inputName}
      fill="outline"
      shape="round"
      style={{ marginTop: "15px" }}
    />
  );
}
