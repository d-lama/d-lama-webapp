import { IonContent, IonPage } from "@ionic/react";
import Header from "../../../components/mobile/Header";
import "./ProjectAdd.css";
import { ProjectAddPrivate } from "./ProjectAddPrivate";
import { ProjectAddPublic } from "./ProjectAddPublic";

export const ProjectAdd: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <ProjectAddPrivate />
        <div className="projectAdd-separator"></div>
        <ProjectAddPublic />
      </IonContent>
    </IonPage>
  );
};
