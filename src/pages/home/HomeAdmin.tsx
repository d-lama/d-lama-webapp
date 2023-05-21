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
  IonPage,
  IonRow,
} from "@ionic/react";
import { useHistory } from "react-router";
import { HeaderDesktop } from "../../components/header/HeaderDesktop";
import { MenuDesktop } from "../../components/menu/MenuDesktop";
import { ProjectGridAdmin } from "./ProjectGridAdmin";

export const HomeAdmin: React.FC = () => {
  const history = useHistory();

  const handleCreateProject = () => {
    history.push("/projectcreation");
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
                  <IonCardHeader>
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
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <IonCard>
                        <IonCardHeader>
                          <IonCardTitle>Statistics</IonCardTitle>
                          <IonCardSubtitle>
                            In this section you can see an overview of the
                            current stats of your labeling projects
                          </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>{/* Content */}</IonCardContent>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};
