import React, {useState} from 'react';
import {IonGrid, IonRow, IonCol} from '@ionic/react';

import './LabelSwipeContainerComponent.css';
import CardLabelComponent from "./CardLabelComponent";
import LabelDropContainerComponent from "./LabelDropContainerComponent";

const LabelSwipeContainerComponent: React.FC<{numberOfContainers:number, labels:{name:string, color:string}[]}> = ({numberOfContainers, labels}) => {
    const [swipeDirection, setSwipeDirection] = useState<string>('');

    let labelItems = getLabelItems()
    let currIndex = 0;
    let taggedInfo = [];

    if (numberOfContainers > 4) {
        numberOfContainers = 4;
    } else if (numberOfContainers < 2) {
        numberOfContainers = 2;
    }

    function handleSwipe(direction: string) {
        setSwipeDirection(direction);

        // TODO: add label to taggedInfo and notify LabelDropContainerComponent for fancy animation
        labelItems[currIndex].label = labels[getDirectionIndex(direction)].name
        taggedInfo[currIndex] = labelItems[currIndex];

        // new current index
        currIndex++;

        if (currIndex === labelItems.length) {
            labelItems = getLabelItems();
            currIndex = 0;
        }
    }

    return (
        <IonGrid className={"screenHeight"}>
            <IonRow>
                <IonCol className={"horizontalWidth labelingGrid"}>
                    <LabelDropContainerComponent labelName={labels[3].name} labelColor={labels[3].color} isVertical={false} />
                </IonCol>
            </IonRow>
            <IonRow className={"growScreen"}>
                <IonCol size={"1"} className={"labelingGrid"}>
                    <LabelDropContainerComponent labelName={labels[0].name} labelColor={labels[0].color} isVertical={true} />
                </IonCol>
                <IonCol size={"10"} className={"centerCard"}>
                    <CardLabelComponent cardSubtitle={""} cardTitle={labelItems[currIndex].title} content={labelItems[currIndex].description} onSwipe={handleSwipe}/>
                </IonCol>
                <IonCol size={"1"} className={"labelingGrid"}>
                    <LabelDropContainerComponent labelName={labels[1].name} labelColor={labels[1].color} isVertical={true} />
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className={"horizontalWidth labelingGrid"}>
                    <LabelDropContainerComponent labelName={labels[2].name} labelColor={labels[2].color} isVertical={false} />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

interface LabelCard {
    title: string;
    description: string;
    label: string|null;
}

function getLabelItems(): LabelCard[]
{
    // TODO: get items from backend => first 50 or so
    return [{title: "Test Title", description: "test description", label: null}]
}

function getDirectionIndex(direction:string): number
{
    let directionIndex = 0;

    switch(direction) {
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