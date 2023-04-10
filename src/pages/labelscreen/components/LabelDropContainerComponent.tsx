import React from 'react';
import {} from '@ionic/react';

import './LabelDropContainerComponent.css';

const LabelDropContainerComponent: React.FC<{labelName:string, labelColor:string, isVertical:boolean, size?:number}> = ({labelName, labelColor, isVertical , size = 100}) => {
    if (isVertical) {
        return verticalContainer(labelName, labelColor, size);
    }

    return horizontalContainer(labelName, labelColor, size);
}

function horizontalContainer(labelName: string, labelColor: string, width:number) {
    let horizontalStyle = {
        width: width + "%",
        "background-color": "#" + labelColor,
        height: "100%"
    };

    return (
        <div className={"dropContainer"}  style={horizontalStyle}>
            <div className={"labelName"}>{labelName}</div>
        </div>
    );
}

function verticalContainer(labelName: string, labelColor: string, height:number) {
    let verticalStyle = {
        height: height + "%",
        "background-color": "#" + labelColor,
        width: "100%"
    };

    return (
        <div className={"dropContainer"} style={verticalStyle}>
            <div className={"labelName"}>{labelName}</div>
        </div>
    );
}

export default LabelDropContainerComponent;