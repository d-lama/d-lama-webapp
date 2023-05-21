import { IonContent, IonItem, IonLabel, IonPage } from "@ionic/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../../App";
import { Button, ButtonType } from "../../components/forms/Button";
import { DynamicField, ElementData } from "../../components/forms/DynamicField";
import { Input, InputType } from "../../components/forms/Input";
import { HeaderDesktop } from "../../components/header/HeaderDesktop";
import { MenuDesktop } from "../../components/menu/MenuDesktop";
import { useAuthStore } from "../../store/authStore";
import "./ProjectCreationDesktop.css";

export default function ProjectCreationDesktop() {
  const { token } = useAuthStore();
  const [labelIndex, setLabelIndex] = useState(0);
  const [labelText, setLabelText] = useState("");
  const [mask, setMask] = useState({
    projectName: "",
    description: "",
  });
  const [labels, setLabels] = useState<ElementData[]>([]);
  const history = useHistory();

  function handleChange(e: { target: { name: any; value: any } }) {
    setMask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function addElement() {
    setLabels([...labels, { id: labelIndex, name: "", description: "" }]);
    setLabelIndex((prevState) => prevState + 1);
  }

  function removeElement(index: number) {
    const updatedElements = [...labels];
    updatedElements.splice(index, 1);
    setLabels(updatedElements);
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
          labels: labels,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function (response) {
        history.push(`/fileUpload/${response.data.id}`);
      })
      .catch(function () {
        setLabelText("Connection failed!");
        setTimeout(() => {
          setLabelText("");
        }, 3000);
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
              className={"custom-border"}
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
              <DynamicField
                elements={labels}
                onLabelChange={handleLabelChange}
                addElement={addElement}
                removeElement={removeElement}
              />
              {labelText && (
                <IonItem id="{{error}}" style={{ marginBottom: "15px" }}>
                  <IonLabel className="ion-text-center" color="danger">
                    {labelText}
                  </IonLabel>
                </IonItem>
              )}
              <Button
                toolTipText={"new screen for uploading file"}
                data-testid="create-button"
                buttonText={"Continue with fileupload"}
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
