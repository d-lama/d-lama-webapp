import {
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  useIonToast,
} from "@ionic/react";
import axios from "axios";
import { flameOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../../App";
import { Button, ButtonType } from "../../components/forms/Button";
import { DynamicField } from "../../components/forms/DynamicField";
import { Input, InputType } from "../../components/forms/Input";
import { HeaderDesktop } from "../../components/header/HeaderDesktop";
import { MenuDesktop } from "../../components/menu/MenuDesktop";
import { ILabelData } from "../../hooks/Label";
import { useAuthStore } from "../../store/authStore";
import "./ProjectCreationDesktop.css";

export default function ProjectCreationDesktop() {
  const { token } = useAuthStore();
  const [labelIndex, setLabelIndex] = useState(0);
  const [mask, setMask] = useState({
    projectName: "",
    description: "",
  });
  const [dataType, setDataType] = useState(0);
  const [labels, setLabels] = useState<ILabelData[]>([]);
  const history = useHistory();
  const [present] = useIonToast();

  function handleChange(e: { target: { name: any; value: any } }) {
    setMask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSelectChange(e: any) {
    setDataType(Number(e.target.value));
  }

  function addElement() {
    setLabels([...labels, { id: labelIndex, name: "", description: "" }]);
    setLabelIndex((prevState) => prevState + 1);
  }

  function removeElement(index: number) {
    const updatedElements = [...labels];
    updatedElements.splice(index, 1);
    setLabels(updatedElements);
    setLabelIndex((prevState) => prevState - 1);
  }

  function handleLabelChange(index: number, value: string) {
    const updatedElements = [...labels];
    updatedElements[index].name = value;
    setLabels(updatedElements);
  }

  function handleProjectSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    axios
      .post(
        `${API_URL}/project`,
        {
          projectName: mask.projectName,
          description: mask.description,
          dataType: dataType,
          labels: labels,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        history.push(`/fileUpload/${response.data.id}/${dataType}`);
      })
      .catch(() => {
        present({
          message: `An error occurred while uploading the data points.`,
          duration: 5000,
          position: "top",
          icon: flameOutline,
          color: "danger",
        });
      });
  }

  return (
    <>
      <MenuDesktop />
      <IonPage id="main-content">
        <HeaderDesktop />
        <IonContent class={"ion-padding"}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <form
              className="custom-border create"
              style={{ width: "80%", maxWidth: "600px" }}
              onSubmit={handleProjectSubmit}
            >
              <Input
                name={"projectName"}
                change={handleChange}
                inputName={"Enter Project Name"}
                placeholder={"D-LAMA Test Project"}
                helperText={"Enter a valid name"}
                errorText={"Invalid text"}
                inputType={InputType.text}
                required={true}
              />

              <Input
                name={"description"}
                change={handleChange}
                inputName={"Enter Project Description"}
                placeholder={"Text"}
                helperText={"Enter a valid description"}
                errorText={"Invalid type"}
                inputType={InputType.text}
              />

              <IonSelect
                name="dataType"
                label="Select Project Datatype"
                placeholder="Select Datatype"
                className="ion-text-center"
                fill="outline"
                shape="round"
                onIonChange={handleSelectChange}
                interface="popover"
                labelPlacement="stacked"
                aria-label="dataType"
              >
                <IonSelectOption value="0">Text</IonSelectOption>
                <IonSelectOption value="1">Image</IonSelectOption>
              </IonSelect>

              <DynamicField
                elements={labels}
                onLabelChange={handleLabelChange}
                addElement={addElement}
                removeElement={removeElement}
              />

              <Button
                toolTipText={"new screen for uploading file"}
                data-testid="create-button"
                buttonText={"Continue with file upload"}
                buttonType={ButtonType.submit}
                color={"secondary"}
              />
            </form>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
