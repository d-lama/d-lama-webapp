import React from 'react';
import {IonGrid, IonRow, IonCol} from '@ionic/react';

import './LabelSwipeContainerComponent.css';
import CardLabelComponent from "./CardLabelComponent";
import LabelDropContainerComponent from "./LabelDropContainerComponent";

const LabelSwipeContainerComponent: React.FC<{numberOfContainers:number, labels:{name:string, color:string}[]}> = ({numberOfContainers, labels}) => {
    let labelItems = getLabelItems()
    let currIndex = 0;

    if (numberOfContainers > 8) {
        numberOfContainers = 8;
    } else if (numberOfContainers < 2) {
        numberOfContainers = 2;
    }

    return (
        <IonGrid className={"screenHeight"}>
            <IonRow>
                <IonCol>
                    <LabelDropContainerComponent labelName={labels[3].name} labelColor={labels[3].color} isVertical={false} />
                </IonCol>
            </IonRow>
            <IonRow className={"growScreen"}>
                <IonCol size={"0.5"}>
                    <LabelDropContainerComponent labelName={labels[0].name} labelColor={labels[0].color} isVertical={true} />
                </IonCol>
                <IonCol size={"11"} className={"centerCard"}>
                    <CardLabelComponent cardSubtitle={""} cardTitle={labelItems[currIndex].title} content={labelItems[currIndex].description}/>
                </IonCol>
                <IonCol size={"0.5"}>
                    <LabelDropContainerComponent labelName={labels[1].name} labelColor={labels[1].color} isVertical={true} />
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <LabelDropContainerComponent labelName={labels[2].name} labelColor={labels[2].color} isVertical={false} />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

interface LabelCard {
    title: string;
    description: string;
}

function getLabelItems(): LabelCard[]
{
    // TODO: get items from backend => first 50 or so
    return [{title: "Test Title", description: "test description"}]
}

export default LabelSwipeContainerComponent;