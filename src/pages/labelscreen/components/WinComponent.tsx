import React from 'react';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon} from '@ionic/react';
// since its the same css
import './HelpComponent.css';
import {returnDownBackOutline} from "ionicons/icons";
import {useHistory} from "react-router-dom";

const WinComponent: React.FC = () => {

    const history = useHistory();

    const returnActionHandler = function returnActionHandler() {
        history.push('/home');
    }

    return (
        <div className="help-overlay">
            <IonCard className="help-card">
                <IonCardHeader className="help-card-header">
                    <IonCardTitle className="help-card-title">Finished!</IonCardTitle>
                </IonCardHeader>

                <IonCardContent className="help-card-content">
                    Congratulations! You finished this project!
                    Now resume with other Projects:
                    <br/>
                    <IonButton onClick={returnActionHandler} size="small"><IonIcon slot="icon-only" icon={returnDownBackOutline}></IonIcon></IonButton>
                </IonCardContent>
            </IonCard>
        </div>
    );
};

export default WinComponent;
