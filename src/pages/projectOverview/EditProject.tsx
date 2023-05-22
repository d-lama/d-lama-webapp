import {
  IonAlert,
  IonButton,
  IonCol,
  IonGrid,
  IonLabel,
  IonListHeader,
  IonRow,
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
      <IonGrid class="edit">
        <IonRow className="border">
          <IonCol size="12">
            <EditProjectDetails project={project} />
          </IonCol>
        </IonRow>

        <IonRow className="border">
          <IonCol size="12">
            <EditProjectData project={project} />
          </IonCol>
        </IonRow>

        <IonRow className="border">
          <IonCol size="12">
            <EditProjectLabel project={project} />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="12">
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
                  handler: () => {
                    handleProjectDelete;
                  },
                },
              ]}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
