import { IonCol, IonProgressBar, useIonToast } from "@ionic/react";
import { flameOutline } from "ionicons/icons";
import React from "react";
import { IProjectsData, useProjects } from "../../hooks/useProjects";
import { ProjectButton } from "./ProjectButton";

export const ProjectGrid: React.FC = () => {
  const [present] = useIonToast();
  const projectsQuery = useProjects();

  if (projectsQuery.isLoading || projectsQuery.isRefetching) {
    return <IonProgressBar type="indeterminate" color="primary" />;
  }

  if (projectsQuery.isError || projectsQuery.data === undefined) {
    present({
      message: "An error occurred while fetching the projects.",
      duration: 5000,
      position: "top",
      icon: flameOutline,
      color: "danger",
    });
    return <></>;
  }

  return (
    <>
      {projectsQuery.data.map((project: IProjectsData, i: number) => (
        <IonCol size="12" key={i}>
          {/* TODO: fix progress -> add calculation */}
          <ProjectButton
            key={project.id}
            projectId={project.id}
            title={project.name}
            progress={Math.random() * 100}
          />
        </IonCol>
      ))}
    </>
  );
};
