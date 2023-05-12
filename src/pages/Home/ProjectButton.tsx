import { IonButton, IonIcon } from "@ionic/react";
import { play } from "ionicons/icons";
import React from "react";
import "./ProjectButton.css";

interface IProjectButtonProps {
  title: string;
  progress: number;
}

export const ProjectButton: React.FC<IProjectButtonProps> = ({
  title,
  progress,
}) => {
  const progressBarStyle: React.CSSProperties = {
    width: `${progress}%`,
  };

  return (
    <IonButton className="projectBtn-btn" fill="outline">
      <div
        className="projectBtn-progressBar"
        style={progressBarStyle}
        role="progressbar"
      ></div>
      <span className="projectBtn-title" role="title">
        {title}
      </span>
      <IonIcon icon={play} className="projectBtn-icon" />
    </IonButton>
  );
};
