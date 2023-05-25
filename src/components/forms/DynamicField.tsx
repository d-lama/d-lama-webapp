import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { ILabelData } from "../../hooks/Label";
import { Button, ButtonType } from "./Button";

interface DynamicFieldProps {
  elements: ILabelData[];
  onLabelChange: (index: number, value: string) => void;
  addElement?: () => void;
  removeElement: (index: number) => void;
}

export function DynamicField(props: DynamicFieldProps) {
  return (
    <IonList>
      {props.elements.map((element, index) => (
        <IonItem key={index}>
          <IonInput
            value={element.name}
            placeholder="Enter new label"
            onIonChange={(e) =>
              props.onLabelChange(index, e.detail.value!.toString())
            }
          />
          <IonButton
            className={"delete-button"}
            color={"danger"}
            onClick={() => props.removeElement(index)}
          >
            Delete
          </IonButton>
        </IonItem>
      ))}
      {props.addElement && (
        <Button
          toolTipText={
            "When pressed please fill out the input field with needed label name"
          }
          buttonText={"Add Label"}
          buttonType={ButtonType.button}
          color={"secondary"}
          action={props.addElement}
        />
      )}
    </IonList>
  );
}
