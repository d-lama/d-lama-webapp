import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { API_URL } from "../App";
import { Button, ButtonType } from "../components/forms/Button";
import { HeaderDesktop } from "../components/header/HeaderDesktop";
import { MenuDesktop } from "../components/menu/MenuDesktop";
import { useAuthStore } from "../store/authStore";
import "./ProjectCreationDesktop.css";

interface RouteParams {
  projectId: string;
}

export default function FileUploadDesktop() {
  const { token } = useAuthStore();
  const [labelText, setLabelText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { projectId } = useParams<RouteParams>();
  const history = useHistory();

  function handleFileSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("uploadedFile", selectedFile);

      axios
        .post(
          `${API_URL}/Datapoint/${projectId}/UploadTextDataPoints`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function () {
          history.push("/home");
        })
        .catch(function () {
          setLabelText("Error in fileUpload!");
          setTimeout(() => {
            setLabelText("");
          }, 3000);
        });
    }
  }

  function handleFileUpload() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
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
              style={{ width: "80%", maxWidth: "500px" }}
              onSubmit={handleFileSubmit}
            >
              <div>
                <div className="file-input" onClick={handleFileUpload}>
                  {selectedFile ? (
                    <p>{selectedFile.name}</p>
                  ) : (
                    <p>Select file</p>
                  )}
                </div>
                <input
                  type="file"
                  accept=".csv,.txt"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              {labelText && (
                <IonItem id="{{error}}" style={{ marginBottom: "15px" }}>
                  <IonLabel className="ion-text-center" color="danger">
                    {labelText}
                  </IonLabel>
                </IonItem>
              )}
              <Button
                toolTipText={
                  "When pressed file will be uploaded to the corresponding project"
                }
                data-testid="create-button"
                buttonText={"Create Project"}
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
