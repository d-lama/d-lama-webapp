import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import './HelpComponent.css';
import LabelMapComponent from "./LabelMapComponent";

const HelpComponent: React.FC<{ projectTitle: string, projectDescription: string, labels: {color: string, text: string}[]} > = ({projectTitle, projectDescription, labels}) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{projectTitle}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                {projectDescription}
                <LabelMapComponent labels={labels} />
            </IonCardContent>
        </IonCard>
    );
}
export default HelpComponent;