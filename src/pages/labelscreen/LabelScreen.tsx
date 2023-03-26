import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CardLabelComponent from './components/CardLabelComponent';
import './LabelScreen.css';
import React from "react";

const LabelScreen: React.FC<{projectTitle: string, projectDescription: string}> = ({projectTitle, projectDescription}) => {
    return (
        <IonPage>
            <IonContent fullscreen>

                <CardLabelComponent cardSubtitle={""} cardTitle={""} content={""}/>
            </IonContent>
        </IonPage>
    );
};

export default LabelScreen;
