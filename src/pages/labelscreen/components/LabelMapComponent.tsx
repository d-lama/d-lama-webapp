import React from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

import './LabelMapComponent.css';

const LabelMapComponent: React.FC<{ labels: {color: string, text: string}[]} > = ({labels}) => {

    if (labels.some(label => label.text.length > 10)) {
        return <LabelList labels={labels} />
    }

    return <LabelMap labels={labels} />
}

const LabelList: React.FC<{labels: {color: string, text: string}[]} > = ({labels}) => {
    return (
        <>
            <ul className={"labelMap"}>
                {labels.map((label, index) => (
                    <li color={label.color} key={index}>{label.text}</li>
                ))}
            </ul>
        </>
    );
}

const LabelMap: React.FC<{labels: {color: string, text: string}[]} > = ({labels}) => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="4">1</IonCol>
                <IonCol size="4">2</IonCol>
                <IonCol size="4">3</IonCol>
                <IonCol size="4">4</IonCol>
                <IonCol size="4">5</IonCol>
                <IonCol size="4">6</IonCol>
                <IonCol size="4">7</IonCol>
                <IonCol size="4">8</IonCol>
                <IonCol size="4">9</IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default LabelMapComponent;