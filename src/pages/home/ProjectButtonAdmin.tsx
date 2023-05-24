import { IonButton, IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";
import "./ProjectButton.css";

export interface IProjectButtonAdminProps {
  projectId: number;
  title: string;
}

export const ProjectButtonAdmin: React.FC<IProjectButtonAdminProps> = ({
  projectId,
  title,
}) => {
  const history = useHistory();

  return (
    <IonButton
      className="projectBtn-btn"
      fill="outline"
      onClick={() => {
        history.push(`/project/${projectId}`);
      }}
    >
      <span className="projectBtn-title" role="title">
        {title}
      </span>
      <IonIcon icon={createOutline} className="projectBtn-icon" />
    </IonButton>
  );
};
