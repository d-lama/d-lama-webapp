import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  useIonToast,
} from "@ionic/react";
import { flameOutline } from "ionicons/icons";
import moment from "moment";
import { API_URL } from "../../App";
import { Button, ButtonType } from "../../components/forms/Button";
import { DATA_TYPE, IProjectData } from "../../hooks/useProject";
import { useAuthStore } from "../../store/authStore";

interface IShowProjectProps {
  project: IProjectData;
}

export const ShowProject: React.FC<IShowProjectProps> = ({ project }) => {
  const { token } = useAuthStore();
  const [present] = useIonToast();
  const currentDate = moment().format("YYYY-MM-DD HH:MM:SS");

  const handleDownloadLabeledData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/datapoint/${project.id}/GetLabeledData`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${currentDate}_${project.projectName}.json`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      present({
        message: "An error occurred while downloading the results.",
        duration: 5000,
        position: "top",
        icon: flameOutline,
        color: "danger",
      });
    }
  };
  return (
    <>
      <IonCard>
        <IonCardHeader color={"secondary"}>
          <IonCardTitle>Details</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid class="details">
            <IonRow>
              <IonCol size="3" className="label">
                Name
              </IonCol>
              <IonCol size="9" className="value">
                {project.projectName}
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="3" className="label">
                Description
              </IonCol>
              <IonCol size="9" className="value">
                {project.description}
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="3" className="label">
                Datatype
              </IonCol>
              <IonCol size="9" className="value">
                {DATA_TYPE[project.dataType]}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>

      <IonCard className="card-margin-top">
        <IonCardHeader color={"secondary"}>
          <IonCardTitle>Labels</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid class="details">
            {project.labels.map((label, index) => (
              <IonRow key={label.id}>
                <IonCol size="3" className="label">
                  Label {index + 1}
                </IonCol>
                <IonCol size="9" className="value">
                  {label.name}
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCardContent>
      </IonCard>
      <Button
        toolTipText={"Download the labeled data"}
        buttonText={"Download Labeled Data"}
        buttonType={ButtonType.button}
        color={"primary"}
        action={handleDownloadLabeledData}
      />
    </>
  );
};
