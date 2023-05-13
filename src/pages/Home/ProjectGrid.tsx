import { IonCol, IonGrid, IonRow, IonToast, useIonToast } from "@ionic/react";
import { flameOutline, timeOutline } from "ionicons/icons";
import React from "react";
import { useQuery } from "react-query";
import { useProjects } from "../../hooks/useProjects";
import { ProjectButton } from "./ProjectButton";

export const ProjectGrid: React.FC = () => {
  // const { projects } = useProjects();
  const [present] = useIonToast();
  const { isLoading, isError, data } = useQuery("useProjects", useProjects);
  // const data = useProjects();
  // console.log(data);

  if (isLoading) {
    return (
      <IonCol>
        <h3>Loading...</h3>
      </IonCol>
    );
  }

  if (isError || data === undefined) {
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
      {data.map((project: any) => (
        <IonCol size="6" key={project.id}>
          <ProjectButton key={project.id} title={project.title} progress={0} />
        </IonCol>
      ))}
    </>
  );
};
