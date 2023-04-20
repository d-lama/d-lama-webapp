import { IonCol, IonGrid, IonIcon, IonInput, IonRow } from "@ionic/react";
import { addCircle } from "ionicons/icons";
import React from "react";
import "./ProjectAdd.css";

export const ProjectAddPrivate: React.FC = () => {
  const handleAdd = () => {
    // TODO:
    console.log("click");
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12">
          <h1 className="projectAdd-title">Private</h1>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="10">
          <IonInput placeholder="Enter text" />
        </IonCol>
        <IonCol size="2" className="ion-text-right">
          <IonIcon
            icon={addCircle}
            onClick={handleAdd}
            aria-label="Add a new private project"
            className="projectAdd-add-project-icon"
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
