import { IonContent, IonRow, IonPage, IonGrid, IonCol, IonItem } from '@ionic/react';
import CardLabelComponent from './components/CardLabelComponent';
import './LabelScreen.css';
import React from "react";
import LabelNavigationComponent from "./components/LabelNavigationComponent";
import LabelSwipeContainerComponent from "./components/LabelSwipeContainerComponent";

const LabelScreen: React.FC<{progress: number, maxNumberOfLabels: number, containerNumber:number, labels:{name:string, color:string}[]}> = ({progress, maxNumberOfLabels, containerNumber, labels}) => {



    return (
        <IonPage>
            <IonContent fullscreen>
                <LabelNavigationComponent progress={progress} maxNumberOfLabels={maxNumberOfLabels} />
                <LabelSwipeContainerComponent numberOfContainers={containerNumber} labels={labels} />
            </IonContent>
        </IonPage>
    );
};

export default LabelScreen;
