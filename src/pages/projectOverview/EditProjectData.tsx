import { useIonToast } from "@ionic/react";
import axios from "axios";
import { flameOutline, sparklesOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { API_URL } from "../../App";
import { Button, ButtonType } from "../../components/forms/Button";
import { IProjectData } from "../../hooks/useProject";
import { useAuthStore } from "../../store/authStore";

interface IEditProjectProps {
  project: IProjectData;
}

export const EditProjectData: React.FC<IEditProjectProps> = ({ project }) => {
  const [present] = useIonToast();
  const { token } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  }

  function handleFileSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("uploadedFile", selectedFile);
      axios
        .post(
          `${API_URL}/datapoint/${project.id}/UploadTextDataPoints`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function () {
          present({
            message: "New data points have been successfully added.",
            duration: 5000,
            position: "top",
            icon: sparklesOutline,
            color: "success",
          });
        })
        .catch(function () {
          present({
            message: "An error occurred while saving the new data points.",
            duration: 5000,
            position: "top",
            icon: flameOutline,
            color: "danger",
          });
        });
    }
  }

  return (
    <form onSubmit={handleFileSubmit}>
      <div>
        <div className="file-input" onClick={handleFileUpload}>
          {selectedFile ? <h3>{selectedFile.name}</h3> : <h3>Select file</h3>}
        </div>
        <input
          type="file"
          accept=".csv,.txt"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button
          buttonText={"Append new data points"}
          buttonType={ButtonType.submit}
          color={"primary"}
        />
      </div>
    </form>
  );
};
