import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../../App";
import { useAuthStore } from "../../../store/authStore";
import { Project } from "../LabelScreen";
import CardLabelComponent from "./CardLabelComponent";
import LabelDropContainerComponent from "./LabelDropContainerComponent";
import "./LabelSwipeContainerComponent.css";

interface LabelCard {
  dataPointIndex: number;
  content: string;
  projectId: number;
  labeledDataPoints: any[];
}

const MAX_LABEL_LOAD_AMOUNT = 5;
let currIndex = 0;
let progressCount = 0;

const LabelSwipeContainerComponent: React.FC<{
  numberOfContainers: number;
  projectData: Project;
  setProgress: (progress: number) => void;
  setUndoAction: (isUndo: boolean) => void;
  undoAction: boolean;
  setShowWin: (isShowWin: boolean) => void;
  darkMode: boolean;
}> = ({
  numberOfContainers,
  projectData,
  setProgress,
  setUndoAction,
  undoAction,
  setShowWin,
  darkMode,
}) => {
  const [, setSwipeDirection] = useState<string>("");
  const [labelItems, setLabelItems] = useState<LabelCard[]>([]);
  const { token } = useAuthStore();

  const history = useHistory();

  const getLabelItems = async function getLabelItems(
    projectId: number,
    startIndex: number
  ) {
    try {
      let endIndex = startIndex + MAX_LABEL_LOAD_AMOUNT - 1;
      const response = await axios.get(
        `${API_URL}/DataPoint/${projectId}/${startIndex}/${endIndex}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLabelItems(response.data);
    } catch (error) {
      // do nothing
    }
  };

  const sendLabeledData = async function sendLabeledData(
    projectId: number,
    labelItem: LabelCard
  ) {
    try {
      const response = await axios.post(
        `${API_URL}/DataPoint/${projectId}/LabelDataPoint/${labelItem.dataPointIndex}`,
        labelItem.labeledDataPoints[0],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      // return to project view
      history.push("/home");
    }
  };

  const undoLastLabel = async function undoLastLabel(
    projectId: number,
    targetIndex: number
  ) {
    try {
      const response = await axios.delete(
        `${API_URL}/DataPoint/${projectId}/LabelDataPoint/${targetIndex}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      currIndex = 0;
      progressCount--;
      setProgress(targetIndex);
      getLabelItems(projectData.id, targetIndex);
    } catch (error) {
      // return to project view
      history.push("/home");
    } finally {
      // Reset the undo action state to false
      setUndoAction(false);
    }
  };

  let labels = projectData.labels;

  if (numberOfContainers > 4) {
    numberOfContainers = 4;
  } else if (numberOfContainers < 2) {
    numberOfContainers = 2;
  }

  function handleSwipe(direction: string) {
    setSwipeDirection(direction);
    let index = getDirectionIndex(direction);

    if (index >= labels.length) {
      return;
    }

    // Create a copy of labelItems array
    let updatedLabelItems = [...labelItems];

    // Update the label in the copy
    updatedLabelItems[currIndex] = { ...labelItems[currIndex] };
    updatedLabelItems[currIndex].labeledDataPoints[0] = labels[index].id;

    // Set the state with the updated copy
    sendLabeledData(projectData.id, updatedLabelItems[currIndex]);
    setLabelItems(updatedLabelItems);

    // set progress bar
    progressCount++;
    setProgress(progressCount);

    // new current index
    currIndex++;

    if (currIndex === labelItems.length) {
      if (projectData.dataPointsCount === progressCount) {
        setShowWin(true);
        return;
      }

      // send labeled data and get new labelitems
      getLabelItems(
        projectData.id,
        labelItems[currIndex - 1].dataPointIndex + 1
      );

      currIndex = 0;
    }
  }

  useEffect(() => {
    progressCount = projectData.labeledDataPointsCount;
    getLabelItems(projectData.id, progressCount);
  }, []);

  useEffect(() => {
    // Handle the undo action
    if (undoAction) {
      if (progressCount > 0) {
        // do undo
        undoLastLabel(projectData.id, progressCount - 1);
      } else {
        setUndoAction(false);
      }
    }
  }, [undoAction]);

  return (
    <IonGrid className={"screenHeight"}>
      <IonRow>
        <IonCol className={"horizontalWidth labelingGrid"}>
          {dropContainerChecker(false, labels, 3)}
        </IonCol>
      </IonRow>
      <IonRow className={"growScreen"}>
        <IonCol size={"1"} className={"labelingGrid"}>
          {dropContainerChecker(true, labels, 0)}
        </IonCol>
        <IonCol size={"10"} className={"centerCard"}>
          {labelItems.length &&
            getCard(labelItems[currIndex], handleSwipe, currIndex)}
        </IonCol>
        <IonCol size={"1"} className={"labelingGrid"}>
          {dropContainerChecker(true, labels, 1)}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className={"horizontalWidth labelingGrid"}>
          {dropContainerChecker(false, labels, 2)}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

function dropContainerChecker(
  isVertical: boolean,
  labels: any[],
  index: number
) {
  let component = null;

  if (labels.length > index) {
    let color = getFixedColors(index);
    component = (
      <LabelDropContainerComponent
        labelName={labels[index].name}
        labelColor={color}
        isVertical={isVertical}
      />
    );
  }

  return component;
}

export function getFixedColors(index: number): string {
  let color = "";

  switch (index) {
    case 0:
      color = "ECD407";
      break;
    case 1:
      color = "0956BF";
      break;
    case 2:
      color = "379711";
      break;
    case 3:
      color = "D72600";
      break;
  }

  return color;
}

function getCard(
  labelItem: any,
  handleSwipe: (direction: string) => void,
  currIndex: number
) {
  if (!labelItem) {
    return null;
  }

  return (
    <CardLabelComponent
      cardSubtitle={""}
      cardTitle={""}
      content={labelItem.content}
      onSwipe={handleSwipe}
    />
  );
}

function getDirectionIndex(direction: string): number {
  let directionIndex = 0;

  switch (direction) {
    case "up":
      directionIndex = 3;
      break;
    case "down":
      directionIndex = 2;
      break;
    case "left":
      directionIndex = 0;
      break;
    case "right":
      directionIndex = 1;
      break;
  }

  return directionIndex;
}

export default LabelSwipeContainerComponent;
