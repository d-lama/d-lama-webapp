import { useIonToast } from "@ionic/react";
import axios from "axios";
import { flameOutline, sparklesOutline } from "ionicons/icons";
import { useState } from "react";
import { API_URL } from "../../App";
import { Button, ButtonType } from "../../components/forms/Button";
import { Input, InputType } from "../../components/forms/Input";
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

  function handleChange(e: { target: { name: any; value: any } }) {
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
        // this method is used here because the page needs to refresh -> I'm sure there're better methods
        // window.location.href = `/project/${project.id}`;
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
      <Input
        name={"projectName"}
        value={project.projectName}
        change={handleChange}
        inputName={"Enter Project Name"}
        placeholder={"D-LAMA Test Project"}
        helperText={"Enter a valid name"}
        errorText={"Invalid text"}
        inputType={InputType.text}
      />
      <Input
        name={"description"}
        value={project.description}
        change={handleChange}
        inputName={"Enter Project Description"}
        placeholder={"Text"}
        helperText={"Enter a valid description"}
        errorText={"Invalid type"}
        inputType={InputType.text}
      />
      <Button
        buttonText={"Save Detail Changes"}
        buttonType={ButtonType.submit}
        color={"primary"}
      />
    </form>
  );
};
