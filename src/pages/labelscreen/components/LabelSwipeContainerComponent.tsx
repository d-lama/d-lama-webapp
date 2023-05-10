import React, {useState} from 'react';
import {IonGrid, IonRow, IonCol} from '@ionic/react';

import './LabelSwipeContainerComponent.css';
import CardLabelComponent from "./CardLabelComponent";
import LabelDropContainerComponent from "./LabelDropContainerComponent";

const LabelSwipeContainerComponent: React.FC<{numberOfContainers:number, labels:{id:number, name:string, description:string}[]}> = ({numberOfContainers, labels}) => {
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
        let index = getDirectionIndex(direction)

        // TODO: add label to taggedInfo and notify LabelDropContainerComponent for fancy animation
        if (index >= labels.length) {
            return;
        }

        labelItems[currIndex].label = labels[index].id
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
                    {dropContainerChecker(false, labels, 3)}
                </IonCol>
            </IonRow>
            <IonRow className={"growScreen"}>
                <IonCol size={"1"} className={"labelingGrid"}>
                    {dropContainerChecker(true, labels, 0)}
                </IonCol>
                <IonCol size={"10"} className={"centerCard"}>
                    <CardLabelComponent cardSubtitle={""} cardTitle={labelItems[currIndex].title} content={labelItems[currIndex].description} onSwipe={handleSwipe}/>
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
}

interface LabelCard {
    title: string;
    description: string;
    label: number|null;
}

function dropContainerChecker(isVertical:boolean, labels:any[], index:number) {
    let component = null;

    console.log(labels)

    if (labels.length > index) {
        component = <LabelDropContainerComponent labelName={labels[index].name} labelColor={labels[index].color} isVertical={isVertical} />
    }

    return component;
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