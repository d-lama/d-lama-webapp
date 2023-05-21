import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API_URL } from "../../App";
import { useAuthStore } from "../../store/authStore";
import "./LabelScreen.css";
import HelpComponent from "./components/HelpComponent";
import LabelNavigationComponent from "./components/LabelNavigationComponent";
import LabelSwipeContainerComponent from "./components/LabelSwipeContainerComponent";
import WinComponent from "./components/WinComponent";

export interface Project {
  id: number;
  projectName: string;
  description: string;
  labeledDataPointsCount: number;
  dataPointsCount: number;
  dataType: number,
  labels: {
    id: number;
    name: string;
    description: string;
  }[];
}

const LabelScreen: React.FC = () => {
  const [projectInfo, setProjectInfo] = useState<Project | undefined>();
  const [dataPointAmount, setDataPointAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [showHelp, setShowHelp] = useState(false);
  const [undoAction, setUndoAction] = useState<boolean>(false);
  const [showWin, setShowWin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { token } = useAuthStore();

  const projectParams: { id: string | undefined } = useParams();
  const projectId = projectParams.id;
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("dark-theme") === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    async function getProjectInfo() {
      try {
        const response = await axios.get(`${API_URL}/Project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProgress(response.data.labeledDataPointsCount);
        setProjectInfo(response.data);

        if (
          response.data.labeledDataPointsCount == response.data.dataPointsCount
        ) {
          setShowWin(true);
        }
      } catch (error) {
        // return to project view
        history.push("/home");
      } finally {
        setLoading(false);
      }
    }

    getProjectInfo();
  }, [projectId]);

  useEffect(() => {
    async function getDataPointsAmount() {
      try {
        const response = await axios.get(
          `${API_URL}/DataPoint/${projectId}/GetNumberOfDataPoints`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDataPointAmount(response.data);
      } catch (error) {
        // return to project view
        history.push("/home");
      }
    }

    getDataPointsAmount();
  }, [dataPointAmount]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!projectInfo) {
    return <p>Project not found.</p>;
  }

  let containerNumber = projectInfo.labels.length;

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <LabelNavigationComponent
          progress={progress}
          maxNumberOfLabels={dataPointAmount}
          setShowHelp={setShowHelp}
          undoAction={setUndoAction}
          darkMode={darkMode}
        />
        <LabelSwipeContainerComponent
          numberOfContainers={containerNumber}
          projectData={projectInfo}
          setProgress={setProgress}
          setUndoAction={setUndoAction}
          undoAction={undoAction}
          setShowWin={setShowWin}
          darkMode={darkMode}
        />
      </IonContent>

      {showHelp && (
        <HelpComponent projectInfo={projectInfo} setShowHelp={setShowHelp} />
      )}
      {showWin && <WinComponent />}
    </IonPage>
  );
};

export default LabelScreen;
