import React from 'react';
import {IonGrid, IonRow, IonCol, IonButton, IonIcon, IonContent} from '@ionic/react';
import { returnDownBackOutline, helpOutline } from 'ionicons/icons';

import './LabelNavigationComponent.css';

const LabelNavigationComponent: React.FC<{progress:number, maxNumberOfLabels:number}> = ({progress, maxNumberOfLabels }) => {
    return (

        <IonGrid>
            <IonRow>
                <IonCol size={"2"}>
                    <IonButton size="small"><IonIcon slot="icon-only" icon={returnDownBackOutline}></IonIcon></IonButton>
                </IonCol>
                <IonCol size={"8"}></IonCol>
                <IonCol size={"2"}>
                    <IonButton size="small"><IonIcon slot="icon-only" icon={helpOutline}></IonIcon></IonButton>
                </IonCol>
                <IonCol size={"2"}></IonCol>
                <IonCol size={"8"}>
                    {ProgressLabelingBar(progress, maxNumberOfLabels)}
                </IonCol>
                <IonCol size={"2"}></IonCol>
            </IonRow>
        </IonGrid>
    );
}

function ProgressLabelingBar(progress:number, maxNumberOfLabels:number) {
    let widthPercent = progress / maxNumberOfLabels * 100;

    return (
        <div className={"maxLabelingProgress"}>
            <div className={"labelingProgress"} style={{width: widthPercent + "%"}}></div>
            <div className={"labelingProgressText"}>{progress} / {maxNumberOfLabels}</div>
        </div>
    );
}
export default LabelNavigationComponent;