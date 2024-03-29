import { IonInput } from "@ionic/react";

export enum InputType {
  email = "email",
  password = "password",
  text = "text",
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
  disabled?:boolean;
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
      disabled={props.disabled}
    />
  );
}
