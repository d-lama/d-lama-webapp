import React from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

import './LabelMapComponent.css';
import {getFixedColors} from "./LabelSwipeContainerComponent";

const LabelMapComponent: React.FC<{ labels: {
        id: number;
        name: string;
        description: string;
    }[]} > = ({labels}) => {

    return <LabelList labels={labels} />
}

const LabelList: React.FC<{labels: {
        id: number;
        name: string;
        description: string;
    }[]} > = ({labels}) => {
    return (
        <>
            <ul className={"labelMap"}>
                {labels.map((label, index) => (
                    <li className={"label-point"} style={{backgroundColor: "#" + getFixedColors(index)}} key={index}>{label.name}</li>
                ))}
            </ul>
        </>
    );
}

export default LabelMapComponent;