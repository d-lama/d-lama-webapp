import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useHistory } from "react-router";
import { HeaderDesktop } from "../../components/header/HeaderDesktop";
import { MenuDesktop } from "../../components/menu/MenuDesktop";
import { ProjectGridAdmin } from "./ProjectGridAdmin";
import lama3 from "./asset/lama3.jpg";

export const HomeAdmin: React.FC = () => {
  const history = useHistory();

  const handleCreateProject = () => {
    history.push("/project-create");
  };

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
                  <IonCardHeader color={"secondary"}>
                    <IonCardTitle>My Projects</IonCardTitle>
                    <IonCardSubtitle>
                      In this section you can see an overview of your current
                      labeling projects
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <ProjectGridAdmin />
                    <IonButton
                      title="Create a new project"
                      type="button"
                      size="large"
                      className="ion-text-center"
                      expand="full"
                      shape="round"
                      color="primary"
                      onClick={handleCreateProject}
                      style={{ marginTop: "2rem" }}
                    >
                      Create new project
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard>
                  <IonCardHeader color={"secondary"}>
                    <IonCardTitle>Statistics</IonCardTitle>
                    <IonCardSubtitle>
                      In this section you can see an overview of the current
                      stats of your labeling projects
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <img src={lama3} style={{ maxWidth: "400px" }} />
                    <IonItem color={"primary"} className="ion-text-center">
                      <IonLabel>
                        <h1>Coming soon</h1>
                      </IonLabel>
                    </IonItem>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};
