import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { useProjects } from "../../../hooks/useProjects";
import { PublicProjectButton } from "./PublicProjectButton";

export const PublicProjectGrid: React.FC = () => {
  const { projects } = useProjects();

  return (
    <IonGrid>
      <IonRow>
        {projects.map((project) => (
          <IonCol size="12" key={project.id}>
            <PublicProjectButton
              key={project.id}
              title={project.title}
              link={"#"}
            />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};
