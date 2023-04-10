import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import './CardLabelComponent.css';

const CardLabelComponent: React.FC<{ cardTitle: string, cardSubtitle: string, content: string} > = ({cardTitle, cardSubtitle, content}) => {
    return (
        <IonCard className={"labelingCard"}>
            <IonCardHeader>
                <IonCardTitle>{cardTitle}</IonCardTitle>
                <IonCardSubtitle>{cardSubtitle}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                {content}
            </IonCardContent>
        </IonCard>
    );
}
export default CardLabelComponent;