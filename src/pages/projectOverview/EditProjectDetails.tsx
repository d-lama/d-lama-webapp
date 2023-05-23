import { IonButton, IonInput, useIonToast } from "@ionic/react";
import axios from "axios";
import { flameOutline, sparklesOutline } from "ionicons/icons";
import { useState } from "react";
import { API_URL } from "../../App";
import { IProjectData } from "../../hooks/useProject";
import { useAuthStore } from "../../store/authStore";

interface IEditProjectProps {
  project: IProjectData;
}

export const EditProjectDetails: React.FC<IEditProjectProps> = ({
  project,
}) => {
  const [present] = useIonToast();
  const { token } = useAuthStore();
  const [mask, setMask] = useState({
    projectName: project.projectName,
    description: project.description,
  });

  function handleChange(e: any) {
    setMask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleProjectSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    axios
      .patch(
        `${API_URL}/project/${project.id}`,
        {
          name: mask.projectName,
          description: mask.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        present({
          message: "Project detail changes have been successfully saved.",
          duration: 5000,
          position: "top",
          icon: sparklesOutline,
          color: "success",
        });
      })
      .catch(() => {
        present({
          message: "An error occurred while saving the project data.",
          duration: 5000,
          position: "top",
          icon: flameOutline,
          color: "danger",
        });
      });
  }

  return (
    <form onSubmit={handleProjectSubmit}>
      <IonInput
        className="ion-text-center"
        name={"projectName"}
        value={mask.projectName}
        type={"text"}
        placeholder={"D-LAMA Test Project"}
        onIonChange={handleChange}
        helperText={"Enter a valid name"}
        errorText={"Invalid text"}
        labelPlacement="stacked"
        label={"Enter Project Name"}
        fill="outline"
        shape="round"
        style={{ marginTop: "15px" }}
      />
      <IonInput
        className="ion-text-center"
        name={"description"}
        value={mask.description}
        type={"text"}
        placeholder={"Text..."}
        onIonChange={handleChange}
        helperText={"Enter a description"}
        errorText={"Invalid text"}
        labelPlacement="stacked"
        label={"Enter Project Description"}
        fill="outline"
        shape="round"
        style={{ marginTop: "15px" }}
      />
      <IonButton
        type="submit"
        color={"primary"}
        className="ion-text-center"
        shape="round"
        size="large"
        style={{ marginTop: "2rem" }}
      >
        Save Detail Changes
      </IonButton>
    </form>
  );
};
