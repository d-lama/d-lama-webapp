import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import { Button, ButtonType } from "../../components/forms/Button";
import { HeaderDesktop } from "../../components/header/HeaderDesktop";
import { MenuDesktop } from "../../components/menu/MenuDesktop";
import { ProjectUserRanking } from "../../components/ranking/ProjectUserRanking";
import { useProject } from "../../hooks/useProject";
import { useProjectRanking } from "../../hooks/useProjectRanking";
import { EditProject } from "./EditProject";
import "./ProjectOverviewDesktop.css";
import { ShowProject } from "./ShowProject";

export default function ProjectOverviewDesktop() {
  const projectParams: { id: string | undefined } = useParams();
  const projectId = Number(projectParams.id);
  const projectRankingQuery = useProjectRanking(projectId);
  const projectQuery = useProject(projectId);
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <MenuDesktop />
      <IonPage id="main-content">
        <HeaderDesktop />
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Project Details</IonCardTitle>
                    <IonCardSubtitle>Subtitle</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {projectQuery.isError || projectQuery.data === undefined ? (
                      "An error occurred while fetching the project information."
                    ) : editMode ? (
                      <>
                        <EditProject project={projectQuery.data} />
                        <Button
                          toolTipText={"Cancel editing this project"}
                          buttonText={"Cancel Edit"}
                          buttonType={ButtonType.button}
                          color={"primary"}
                          action={() => {
                            setEditMode(false);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <ShowProject project={projectQuery.data} />
                        <Button
                          toolTipText={"Edit this project"}
                          buttonText={"Edit Project"}
                          buttonType={ButtonType.button}
                          color={"primary"}
                          action={() => {
                            setEditMode(true);
                          }}
                        />
                      </>
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Labelers</IonCardTitle>
                    <IonCardSubtitle>Subtitle</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {projectRankingQuery.isError ||
                    projectRankingQuery.data === undefined ? (
                      "An error occurred while fetching the user rankings."
                    ) : (
                      <ProjectUserRanking data={projectRankingQuery.data} />
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
}
