import React, {useState} from 'react';
import {InputChangeEventDetail, IonInput, IonItem, IonList} from '@ionic/react';
import {Button, ButtonType} from "./Button";

interface DynamicFieldProps {}

interface ElementData {
    label: string;
    placeholder: string;
}

const DynamicField: React.FC<DynamicFieldProps> = () => {
    const [elements, setElements] = useState<ElementData[]>([]);

    const addElement = () => {
        setElements([...elements, { label: '', placeholder: 'Enter a value' }]);
    };

    const handleLabelChange = (index: number, value: string) => {
        const updatedElements = [...elements];
        updatedElements[index].label = value;
        setElements(updatedElements);
    };


    return (
        <IonList>
            {elements.map((element, index) => (
                <IonItem key={index}>
                    <IonInput
                        value={element.label}
                        placeholder={element.placeholder}
                        onIonChange={(e: CustomEvent<InputChangeEventDetail>) => handleLabelChange(index, e.detail.value!)}
                    />
                </IonItem>
            ))}
            <Button buttonText={"Add Label"} buttonType={ButtonType.button}
                    color={"secondary"} action={addElement}></Button>
        </IonList>
    );
};

export default DynamicField;