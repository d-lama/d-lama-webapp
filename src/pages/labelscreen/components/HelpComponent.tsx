import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import './HelpComponent.css';
import LabelMapComponent from "./LabelMapComponent";
import { Project } from "../LabelScreen";

const HelpComponent: React.FC<{ projectInfo: Project, setShowHelp:(isShowHelp:boolean)=>void }> = ({ projectInfo, setShowHelp}) => {

    const closeHelpComponent = function closeHelpComponent() {
        setShowHelp(false);
    }

    return (
        <div className="help-overlay" onClick={closeHelpComponent}>
            <IonCard className="help-card">
                <IonCardHeader className="help-card-header">
                    <IonCardTitle className="help-card-title">{projectInfo.projectName}</IonCardTitle>
                </IonCardHeader>

                <IonCardContent className="help-card-content">
                    {projectInfo.description}
                    <LabelMapComponent labels={projectInfo.labels} />
                </IonCardContent>
            </IonCard>
        </div>
    );
};

export default HelpComponent;
