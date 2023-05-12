import React from 'react';
import {IonButton, IonInput, IonItem, IonList} from '@ionic/react';
import {Button, ButtonType} from "./Button";


interface DynamicFieldProps {
    elements: ElementData[];
    onLabelChange: (index: number, value: string) => void;
    addElement: () => void;
    removeElement: (index: number) => void;
}

export interface ElementData {
    label: string;
}
export function DynamicField(props: DynamicFieldProps) {

    const { elements, onLabelChange, addElement, removeElement} = props;


    return (
        <IonList>
                {elements.map((element, index) => (
                    <IonItem key={index}>
                        <IonInput
                            value={element.label}
                            placeholder="Enter new label"
                            onIonChange={(e) => onLabelChange(index, e.detail.value!)}
                        />
                        <IonButton className={'delete-button'} color={'warning'} onClick={() => removeElement(index)}>Delete</IonButton>
                    </IonItem>
                ))}
            <Button
                buttonText={"Add Label"}
                buttonType={ButtonType.button}
                color={"secondary"}
                action={addElement}></Button>
        </IonList>
    );
}
