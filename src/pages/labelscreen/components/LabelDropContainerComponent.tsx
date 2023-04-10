import React, {useState} from 'react';
import './LabelDropContainerComponent.css';

const LabelDropContainerComponent: React.FC<{labelName:string, labelColor:string, isVertical:boolean, size?:number}> = ({labelName, labelColor, isVertical , size = 100}) => {
    if (isVertical) {
        return (
            <VerticalContainer labelName={labelName} labelColor={labelColor} height={size} />
        );
    }

    return (
        <HorizontalContainer labelName={labelName} labelColor={labelColor} width={size} />
    );
}

const HorizontalContainer:  React.FC<{labelName:string, labelColor:string, width:number}> = ({
    labelName,
    labelColor,
    width
}) => {
    const [isChildVisible, setIsChildVisible] = useState(false);

    let horizontalStyle = {
        width: width + "%",
        backgroundColor: "#" + labelColor,
        height: "100%"
    };

    let backgroundColor =  {
        backgroundColor: "#" + labelColor
    }

    return (
        <div className={"dropContainer"}  style={horizontalStyle} onDragEnter={() => setIsChildVisible(true)} onDragLeave={() => setIsChildVisible(false)} onDrop={tagInfo}>
            <div className={`labelName ${isChildVisible ? '' : 'notvisible'}`} style={backgroundColor}>{labelName}</div>
        </div>
    );
}

const VerticalContainer: React.FC<{labelName:string, labelColor:string, height:number}> = ({
   labelName,
   labelColor,
   height
}) => {
    const [isChildVisible, setIsChildVisible] = useState(false);

    let verticalStyle = {
        height: height + "%",
        backgroundColor: "#" + labelColor,
        width: "100%"
    };

    let backgroundColor =  {
        backgroundColor: "#" + labelColor
    }

    return (
        <div className={"dropContainer"} style={verticalStyle} onMouseEnter={() => setIsChildVisible(true)} onMouseLeave={() => setIsChildVisible(false)}>
            <div className={`labelName ${isChildVisible ? '' : 'notvisible'}`} style={backgroundColor}>{labelName}</div>
        </div>
    );
}

function tagInfo() {

}

export default LabelDropContainerComponent;