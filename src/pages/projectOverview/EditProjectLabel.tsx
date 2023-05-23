import { IonCol, IonGrid, IonRow, useIonToast } from "@ionic/react";
import axios from "axios";
import { flameOutline, sparklesOutline } from "ionicons/icons";
import { useState } from "react";
import { API_URL } from "../../App";
import { Button, ButtonType } from "../../components/forms/Button";
import { DynamicField } from "../../components/forms/DynamicField";
import { ILabelData } from "../../hooks/Label";
import { IProjectData } from "../../hooks/useProject";
import { useAuthStore } from "../../store/authStore";

interface IEditProjectProps {
  project: IProjectData;
}

export const EditProjectLabel: React.FC<IEditProjectProps> = ({ project }) => {
  const [present] = useIonToast();
  const { token } = useAuthStore();
  const [labels, setLabels] = useState<ILabelData[]>(project.labels);
  const [newLabels, setNewLabels] = useState<ILabelData[]>([]);
  const [deletedLabels, setDeletedLabels] = useState<ILabelData[]>([]);
  const [labelIndex, setLabelIndex] = useState(project.labels.length + 1);

  function addElement() {
    setNewLabels([...newLabels, { id: labelIndex, name: "", description: "" }]);
    setLabelIndex((prevState) => prevState + 1);
  }

  function removeElement(index: number) {
    const updatedElements = [...labels];
    setDeletedLabels([...deletedLabels, ...updatedElements.splice(index, 1)]);
    setLabels(updatedElements);
    setLabelIndex((prevState) => prevState - 1);
  }

  function removeNewElement(index: number) {
    const updatedElements = [...newLabels];
    updatedElements.splice(index, 1);
    setNewLabels(updatedElements);
    setLabelIndex((prevState) => prevState - 1);
  }

  function handleLabelChange(index: number, value: string) {
    const updatedElements = [...labels];
    updatedElements[index].name = value;
    setLabels(updatedElements);
  }

  function handleNewLabelChange(index: number, value: string) {
    const updatedElements = [...newLabels];
    updatedElements[index].name = value;
    setNewLabels(updatedElements);
  }

  function handleLabelSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    axios
      .patch(
        `${API_URL}/project/${project.id}`,
        {
          labeSetChanges: labels,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        present({
          message: "Existing labels have been successfully saved.",
          duration: 2000,
          position: "top",
          icon: sparklesOutline,
          color: "success",
        });
      })
      .then(() => {
        if (deletedLabels.length > 0) {
          deletedLabels.forEach((label) => {
            handleDeleteLabel(label);
          });
        }
      })
      .catch(() => {
        present({
          message: "An error occurred while saving the existing labels.",
          duration: 2000,
          position: "top",
          icon: flameOutline,
          color: "danger",
        });
      });
  }

  function handleNewLabelSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (newLabels.length <= 0) return;
    axios
      .post(
        `${API_URL}/project/${project.id}/labels`,
        JSON.stringify(newLabels),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        present({
          message: "New labels have been successfully added.",
          duration: 2000,
          position: "top",
          icon: sparklesOutline,
          color: "success",
        });
      })
      .catch(() => {
        present({
          message: "An error occurred while adding the new labels.",
          duration: 2000,
          position: "top",
          icon: flameOutline,
          color: "danger",
        });
      });
  }

  function handleDeleteLabel(label: ILabelData) {
    if (deletedLabels.length <= 0) return;

    axios
      .delete(`${API_URL}/project/${project.id}/labels/${label.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        present({
          message: `Label ${label.name} hast been successfully deleted.`,
          duration: 2000,
          position: "top",
          icon: sparklesOutline,
          color: "success",
        });
      })
      .catch((error) => {
        present({
          message: `An error occurred while deleting the label ${label.name}.\n${error}`,
          duration: 2000,
          position: "top",
          icon: flameOutline,
          color: "danger",
        });
      });
  }

  return (
    <>
      <DynamicField
        elements={labels}
        onLabelChange={handleLabelChange}
        removeElement={removeElement}
      />
      <DynamicField
        elements={newLabels}
        onLabelChange={handleNewLabelChange}
        addElement={addElement}
        removeElement={removeNewElement}
      />
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <Button
              buttonText={"Save existing labels"}
              buttonType={ButtonType.button}
              color={"primary"}
              action={handleLabelSubmit}
            />
          </IonCol>
          <IonCol size="6">
            <Button
              buttonText={"Save new labels"}
              buttonType={ButtonType.button}
              color={"primary"}
              action={handleNewLabelSubmit}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
