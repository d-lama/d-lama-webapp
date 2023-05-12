import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { useQuery } from "react-query";
import { useProjects } from "../../../hooks/useProjects";
import { ProjectButton } from "./ProjectButton";

export const ProjectGrid: React.FC = () => {
  // const { projects } = useProjects();
  const { isLoading, isError, data } = useQuery("useProjects", useProjects);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || data === undefined) {
    return <span>Error: while fetching</span>;
  }

  return (
    <IonGrid>
      <IonRow>
        {data.map((project) => (
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
