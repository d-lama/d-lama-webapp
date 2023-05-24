import { IonCol, IonProgressBar, useIonToast } from "@ionic/react";
import { flameOutline } from "ionicons/icons";
import React from "react";
import { IMyProjectData, useMyProjects } from "../../hooks/useMyProject";
import { ProjectButtonAdmin } from "./ProjectButtonAdmin";

export const ProjectGridAdmin: React.FC = () => {
  const [present] = useIonToast();
  const projectsQuery = useMyProjects();

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
      {projectsQuery.data.map((project: IMyProjectData, i: number) => (
        <IonCol size="12" key={i}>
          <ProjectButtonAdmin
            key={project.id}
            projectId={project.id}
            title={project.name}
          />
        </IonCol>
      ))}
    </>
  );
};
