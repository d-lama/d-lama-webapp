import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { useProjects } from "../../../hooks/useProjects";
import { ProjectButton } from "./ProjectButton";

export const ProjectGrid: React.FC = () => {
  const { projects } = useProjects();

  return (
    <IonGrid>
      <IonRow>
        {projects.map((project) => (
          <IonCol size="6" key={project.id}>
            <ProjectButton
              key={project.id}
              title={project.title}
              progress={project.progress}
            />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};
