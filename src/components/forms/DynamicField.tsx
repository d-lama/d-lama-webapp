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
    id: number;
    name: string;
    description: string;
}
export function DynamicField(props: DynamicFieldProps) {

    return (
        <IonList>
                {props.elements.map((element, index) => (
                    <IonItem key={index}>
                        <IonInput
                            value={element.name}
                            placeholder="Enter new label"
                            onIonChange={(e) => props.onLabelChange(index, e.detail.value!)}
                        />
                        <IonButton
                            className={'delete-button'}
                            color={'warning'}
                            onClick={() => props.removeElement(index)}>Delete
                        </IonButton>
                    </IonItem>
                ))}
            <Button
                toolTipText={"When pressed please fill out the input field with needed label name"}
                buttonText={"Add Label"}
                buttonType={ButtonType.button}
                color={"secondary"}
                action={props.addElement}></Button>
        </IonList>
    );
}
