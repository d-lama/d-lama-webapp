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
  labeledDataPoints: number;
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
  const [onMove, setOnMove] = useState<string>("");
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
        labelItem.labeledDataPoints,
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
    // @ts-ignore
    updatedLabelItems[currIndex].labeledDataPoints = labels[index].id;

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
          {dropContainerChecker(
            false,
            labels,
            3,
            "" + getDirectionIndex(3, false)
          )}
        </IonCol>
      </IonRow>
      <IonRow className={"growScreen"}>
        <IonCol size={"1"} className={"labelingGrid"}>
          {dropContainerChecker(
            true,
            labels,
            0,
            "" + getDirectionIndex(0, false)
          )}
        </IonCol>
        <IonCol size={"10"} className={"centerCard"}>
          {labelItems.length &&
            getCard(
              labelItems[currIndex],
              handleSwipe,
              currIndex,
              darkMode,
              projectData.dataType,
              projectData.id
            )}
        </IonCol>
        <IonCol size={"1"} className={"labelingGrid"}>
          {dropContainerChecker(
            true,
            labels,
            1,
            "" + getDirectionIndex(1, false)
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className={"horizontalWidth labelingGrid"}>
          {dropContainerChecker(
            false,
            labels,
            2,
            "" + getDirectionIndex(2, false)
          )}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

function dropContainerChecker(
  isVertical: boolean,
  labels: any[],
  index: number,
  direction: string
) {
  let component = null;

  if (labels.length > index) {
    let color = getFixedColors(index);
    component = (
      <LabelDropContainerComponent
        labelName={labels[index].name}
        labelColor={color}
        isVertical={isVertical}
        direction={direction}
      />
    );
  }

  return component;
}

export function getFixedColors(index: number): string {
  let color = "";

  switch (index) {
    case 0:
      color = "820cc2";
      break;
    case 1:
      color = "02c9ac";
      break;
    case 2:
      color = "f93cfa";
      break;
    case 3:
      color = "028999";
      break;
  }

  return color;
}

function getCard(
  labelItem: any,
  handleSwipe: (direction: string) => void,
  currIndex: number,
  darkMode: boolean,
  contentType: number,
  projectId: number
) {
  if (!labelItem) {
    return null;
  }

  let content = contentType === 1 ? labelItem : labelItem.content;

  return (
    <CardLabelComponent
      cardSubtitle={""}
      cardTitle={""}
      content={content}
      contentType={contentType}
      onSwipe={handleSwipe}
      darkMode={darkMode}
      dataPointIndex={content.dataPointIndex}
      projectId={projectId}
    />
  );
}

function getDirectionIndex(
  direction: string | number,
  toIndex: boolean = true
): string | number {
  const directions = ["left", "right", "down", "up"];
  const index = directions.indexOf(String(direction));

  // @ts-ignore
  return toIndex ? index : directions[direction];
}

export default LabelSwipeContainerComponent;
