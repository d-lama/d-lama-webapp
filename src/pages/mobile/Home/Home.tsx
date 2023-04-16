import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import { add } from "ionicons/icons";
import Header from "../../../components/mobile/Header";
import "./Home.css";
import { ProjectGrid } from "./ProjectGrid";

export const Home: React.FC = () => {
  const handleAddProject = () => {
    // TODO: route to add project page
    console.log("click");
  };

  return (
    <IonPage>
      <Header />
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
        </IonGrid>
        <ProjectGrid />
      </IonContent>
    </IonPage>
  );
};
