import { IonButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import React from "react";
import "./PublicProjectButton.css";

interface IPublicProjectButtonProps {
  title: string;
  link: string;
}

export const PublicProjectButton: React.FC<IPublicProjectButtonProps> = ({
  title,
  link,
}) => {
  return (
    <IonButton className="publicProjectAdd-btn" fill="outline">
      <span className="publicProjectAdd-title" role="title">
        {title}
      </span>
      <IonIcon icon={add} className="publicProjectAdd-icon" />
    </IonButton>
  );
};
