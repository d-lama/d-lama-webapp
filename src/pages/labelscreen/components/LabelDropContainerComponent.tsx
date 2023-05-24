import React, { useEffect, useState } from 'react';
import './LabelDropContainerComponent.css';

const LabelDropContainerComponent: React.FC<{labelName:string, labelColor:string, isVertical:boolean, size?:number, direction:string}> = ({labelName, labelColor, isVertical , size = 100, direction}) => {

    if (isVertical) {
        return (
            <VerticalContainer
                labelName={labelName}
                labelColor={labelColor}
                height={size}
                direction={direction}
            />
        );
    }

    return (
        <HorizontalContainer
            labelName={labelName}
            labelColor={labelColor}
            width={size}
            direction={direction}
        />
    );
}

const HorizontalContainer: React.FC<{labelName:string, labelColor:string, width:number, direction:string}> = ({
  labelName,
  labelColor,
  width,
  direction,
}) => {
    let horizontalStyle = {
        width: width + "%",
        backgroundColor: "#" + labelColor,
        height: "100%"
    };

    let backgroundColor =  {
        backgroundColor: "#" + labelColor
    }

    return (
        <div
            className={`dropContainer card-animation-${direction}`}
            style={horizontalStyle}
        >
            <div className={`labelName`} style={backgroundColor}>{labelName}</div>
        </div>
    );
}

const VerticalContainer: React.FC<{labelName:string, labelColor:string, height:number, direction:string}> = ({
     labelName,
     labelColor,
     height,
     direction,
 }) => {
    let verticalStyle = {
        height: height + "%",
        backgroundColor: "#" + labelColor,
        width: "100%"
    };

    let backgroundColor =  {
        backgroundColor: "#" + labelColor
    }

    return (
        <div
            className={`dropContainer card-animation-${direction}`}
            style={verticalStyle}
        >
            <div className={`labelName`} style={backgroundColor}>{labelName}</div>
        </div>
    );
}

export default LabelDropContainerComponent;
