import React, {useState} from 'react';
import {IonGrid, IonRow, IonCol, IonButton, IonIcon, IonContent} from '@ionic/react';
import { returnDownBackOutline, helpOutline, arrowUndoOutline } from 'ionicons/icons';

import './LabelNavigationComponent.css';
import {useHistory} from "react-router-dom";

const LabelNavigationComponent: React.FC<{progress:number, maxNumberOfLabels:number, setShowHelp:(isShow:boolean)=>void, undoAction:(isUndo:boolean)=>void}> = ({progress, maxNumberOfLabels, setShowHelp, undoAction}) => {

    const history = useHistory();

    const handleHelpButtonClick =  function handleHelpButtonClick() {
        setShowHelp(true);
    }

    const handleUndoAction = function handleUndoAction() {
        undoAction(true);
    }

    const returnActionHandler = function returnActionHandler() {
        history.push('/home');
    }

    return (

        <IonGrid className={"navigationLabelingTop"}>
            <IonRow>
                <IonCol size={"2"}>
                    <IonButton onClick={returnActionHandler} size="small"><IonIcon slot="icon-only" icon={returnDownBackOutline}></IonIcon></IonButton>
                </IonCol>
                <IonCol size={"8"}></IonCol>
                <IonCol size={"2"}>
                    <IonButton onClick={handleHelpButtonClick} size="small"><IonIcon slot="icon-only" icon={helpOutline}></IonIcon></IonButton>
                </IonCol>
                <IonCol size={"2"}></IonCol>
                <IonCol size={"8"}>
                    {ProgressLabelingBar(progress, maxNumberOfLabels)}
                </IonCol>
                <IonCol size={"2"}>
                    <IonButton onClick={handleUndoAction} size="small"><IonIcon slot="icon-only" icon={arrowUndoOutline}></IonIcon></IonButton>
                </IonCol>
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