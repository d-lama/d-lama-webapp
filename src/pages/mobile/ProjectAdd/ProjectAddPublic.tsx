import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import "./ProjectAdd.css";
import { PublicProjectGrid } from "./PublicProjectGrid";

export const ProjectAddPublic: React.FC = () => {
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <h1 className="projectAdd-title">Public</h1>
          </IonCol>
        </IonRow>
      </IonGrid>
      <PublicProjectGrid />
    </>
  );
};
