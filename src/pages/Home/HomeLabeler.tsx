import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { HeaderMobile } from "../../components/Header/HeaderMobile";
import { ProjectGrid } from "./ProjectGrid";

export const HomeLabeler: React.FC = () => {
  const handleAddProject = () => {
    // TODO: route to add project page
    console.log("click");
  };

  return (
    <>
      <IonPage>
        <HeaderMobile />
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="10">
                <h1 className="home-title">Projects</h1>
              </IonCol>
              <IonCol size="2" className="ion-text-right">
                <IonIcon
                  icon={add}
                  onClick={handleAddProject}
                  aria-label="Add a new project"
                  className="home-add-project-icon"
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <ProjectGrid />
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};
