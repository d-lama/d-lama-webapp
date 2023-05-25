import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  useIonToast,
} from "@ionic/react";
import axios from "axios";
import { flameOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { API_URL } from "../../App";
import { IProjectData } from "../../hooks/useProject";
import { useAuthStore } from "../../store/authStore";
import { EditProjectData } from "./EditProjectData";
import { EditProjectDetails } from "./EditProjectDetails";
import { EditProjectLabel } from "./EditProjectLabel";

interface IEditProjectProps {
  project: IProjectData;
}

export const EditProject: React.FC<IEditProjectProps> = ({ project }) => {
  const { token } = useAuthStore();
  const [present] = useIonToast();
  const history = useHistory();

  function handleProjectDelete() {
    axios
      .delete(`${API_URL}/project/${project.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        history.push(`/`);
      })
      .catch((error) => {
        present({
          message: `An error occurred while deleting the current project data.\n${error}`,
          duration: 5000,
          position: "top",
          icon: flameOutline,
          color: "danger",
        });
      });
  }

  return (
    <>
      <IonCard>
        <IonCardHeader color={"secondary"}>
          <IonCardTitle>Details</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <EditProjectDetails project={project} />
        </IonCardContent>
      </IonCard>

      <IonCard className="card-margin-top">
        <IonCardHeader color={"secondary"}>
          <IonCardTitle>Data points</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <EditProjectData project={project} />
        </IonCardContent>
      </IonCard>

      <IonCard className="card-margin-top">
        <IonCardHeader color={"secondary"}>
          <IonCardTitle>Labels</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <EditProjectLabel project={project} />
        </IonCardContent>
      </IonCard>

      <IonButton
        id="present-alert"
        size="large"
        className="ion-text-center"
        expand="block"
        shape="round"
        style={{ marginBottom: "10px", minWidth: "260px" }}
        color="danger"
      >
        Delete Project
      </IonButton>
      <IonAlert
        header="Are you sure you want to delete the current project?"
        trigger="present-alert"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {},
          },
          {
            text: "OK",
            role: "confirm",
            handler: handleProjectDelete,
          },
        ]}
      />
    </>
  );
};
