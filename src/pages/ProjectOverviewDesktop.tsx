import {
    IonCard,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonThumbnail
} from "@ionic/react";

import React, {useEffect, useRef, useState} from "react";

import {HeaderDesktop} from "../components/header/HeaderDesktop";
import {Input, InputType} from "../components/forms/Input";
import {Button, ButtonType} from "../components/forms/Button";
import {DynamicField, ElementData} from "../components/forms/DynamicField";
import {useAuthStore} from "../store/authStore";
import axios from "axios";
import {API_URL} from "../App";
import {useParams} from "react-router";
import {star} from "ionicons/icons";

import "./ProjectOverviewDesktop.css"

interface RouteParams {
    projectId: string;
}

interface APIResponse {
    myPositionIndex: number;
    ranking: Labeler[];
}

interface Labeler {
    id: number;
    name: string;
    percentage: number;
}

interface ProjectData {
    id: number;
    dataPointsCount: number;
    labeledDataPointsCount: number;
    projectName: string;
    description: string;
    labels: Array<{
        id: number;
        name: string;
        description: string;
    }>;
}


export default function ProjectOverviewDesktop() {
    const {token} = useAuthStore();
    const [labelIndex, setLabelIndex] = useState(0);
    const [labelText, setLabelText] = useState("");
    const [mask, setMask] = useState({
        projectName: "",
        description: "",
    });
    const [labels, setLabels] = useState<ElementData[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {projectId} = useParams<RouteParams>();
    const [bestLabeler, setBestLabeler] = useState<Labeler | null>(null);
    const [apiResponse, setAPIResponse] = useState<APIResponse | null>(null);
    //to remove when API works
    const mockData = [
        {
            "id": 7538,
            "name": "John Doe",
            "percentage": 0
        },
        {
            "id": 7542,
            "name": "Jane Smith",
            "percentage": 0.055555556
        },
        {
            "id": 7539,
            "name": "Robert Johnson",
            "percentage": 0.11111111
        },
        {
            "id": 7540,
            "name": "Linda Williams",
            "percentage": 0
        },
        {
            "id": 7541,
            "name": "Michael Brown",
            "percentage": 0
        }
    ];

    useEffect(() => {
        axios.get<ProjectData>(`${API_URL}/project/${projectId}`, {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                setMask({
                    projectName: response.data.projectName,
                    description: response.data.description,
                });
                setLabels(response.data.labels);
            })
            .catch(error => {
                console.error('Error fetching project data:', error);
            });
        fetchLabelers();
    }, []);

    function handleChange(e: { target: { name: any; value: any } }) {
        setMask((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    function addElement() {
        setLabels([...labels, {id: labelIndex, name: "", description: ""}]);
        setLabelIndex((prevState) => prevState + 1);
    }

    function removeElement(index: number) {
        const updatedElements = [...labels];
        updatedElements.splice(index, 1);
        setLabels(updatedElements);
    }

    function handleLabelChange(index: number, value: string) {
        const updatedElements = [...labels];
        updatedElements[index].name = value;
        setLabels(updatedElements);
    }


    function handleFileUpload() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
    }


    function handleProjectSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        axios
            .post(
                `${API_URL}/project`,
                {
                    projectName: mask.projectName,
                    description: mask.description,
                    labels: labels,
                },
                {headers: {Authorization: `Bearer ${token}`}}
            )
            .then(function (response) {
                const projectId = response.data.id;
                window.location.href = `/fileUpload/${projectId}`;
            })
            .catch(function () {
                setLabelText("Connection failed!");
                setTimeout(() => {
                    setLabelText("");
                }, 3000);
            });
    }


    function fetchLabelers() {
        const data = {
            myPositionIndex: 0,
            ranking: mockData
        }
        setAPIResponse(data);

        const best = getBestLabeler(data.ranking);
        setBestLabeler(best);
        //uncomment when API ready
        /*        axios.get(`${API_URL}/project/${projectId}/ranking`, {headers: {Authorization: `Bearer ${token}`}})
                    .then(response => {
                        const data = response.data;
                        setAPIResponse(data);
                        const best = getBestLabeler(data);
                        setBestLabeler(best);
                    })
                    .catch(error => {
                        console.error('Error fetching labelers:', error);
                    });*/
    }


    /*    function getBestLabeler() {
            let bestLabeler: Labeler | undefined;
            let maxPercentage = 0;

            if (apiResponse) {
                apiResponse.ranking.forEach((labeler) => {
                    if (labeler.percentage > maxPercentage) {
                        bestLabeler = labeler;
                        maxPercentage = labeler.percentage;
                    }
                });
            }

            return bestLabeler;
        };*/

    //uncomment, when API-Connection works
    function getBestLabeler(labelers: Labeler[]) {
        let best: Labeler | null = null;
        let maxPercentage = 0;

        labelers.forEach((labeler) => {
            if (labeler.percentage > maxPercentage) {
                best = labeler;
                maxPercentage = labeler.percentage;
            }
        });
        return best;
    }


    return (
        <IonPage className="split-view">
            <HeaderDesktop/>
            <IonContent>
                <IonCard>
                    <div className="box">
                        <div className="header">Project Details</div>
                        <div className="horizontal-flex-container">
                            <div className="panel left">
                                <IonCard>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "80vh",
                                        }}
                                    >
                                        <form
                                            style={{width: "80%", maxWidth: "600px"}}
                                            onSubmit={handleProjectSubmit}
                                        >
                                            <div className="header">My Project</div>
                                            <Input
                                                name={"projectName"}
                                                change={handleChange}
                                                inputName={"Enter Project Name"}
                                                placeholder={"D-LAMA Test Project"}
                                                helperText={"Enter a valid name"}
                                                errorText={"Invalid text"}
                                                inputType={InputType.text}
                                            />
                                            <Input
                                                name={"description"}
                                                change={handleChange}
                                                inputName={"Enter Project Description"}
                                                placeholder={"Text"}
                                                helperText={"Enter a valid description"}
                                                errorText={"Invalid type"}
                                                inputType={InputType.text}
                                            />
                                            <div>
                                                <div className="file-input" onClick={handleFileUpload}>
                                                    {selectedFile ? (
                                                        <p>{selectedFile.name}</p>
                                                    ) : (
                                                        <p>Select file</p>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    accept=".csv,.txt"
                                                    style={{display: "none"}}
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                            <DynamicField
                                                elements={labels}
                                                onLabelChange={handleLabelChange}
                                                addElement={addElement}
                                                removeElement={removeElement}
                                            />
                                            {labelText && (
                                                <IonItem id="{{error}}" style={{marginBottom: "15px"}}>
                                                    <IonLabel className="ion-text-center" color="danger">
                                                        {labelText}
                                                    </IonLabel>
                                                </IonItem>
                                            )}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    flexWrap: "wrap",
                                                    maxWidth: "600px",
                                                }}
                                            >
                                                <div style={{flexBasis: "40%", flexGrow: 1, margin: "5px"}}>
                                                    <Button
                                                        toolTipText={"new screen for uploading file"}
                                                        data-testid="create-button-1"
                                                        buttonText={"Changes required"}
                                                        buttonType={ButtonType.submit}
                                                        color={"secondary"}
                                                    />
                                                </div>
                                                <div style={{flexBasis: "40%", flexGrow: 1, margin: "5px"}}>
                                                    <Button
                                                        toolTipText={"new screen for uploading file"}
                                                        data-testid="create-button-2"
                                                        buttonText={"Save Changes"}
                                                        buttonType={ButtonType.submit}
                                                        color={"secondary"}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </IonCard>
                            </div>
                            <div className="panel right">
                                <IonCard>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "80vh",
                                        }}
                                    >
                                        <form
                                            style={{width: "80%", maxWidth: "600px"}}
                                        >
                                            <div className="header">My Datalabeler</div>
                                            {apiResponse && (
                                                <IonList>
                                                    {apiResponse.ranking.map((labeler) => {
                                                        const labelerName = labeler.name;
                                                        const isBestLabeler = labeler === bestLabeler;
                                                        const roundedPercentage = (labeler.percentage * 100).toFixed(2);

                                                        return (
                                                            <IonItem
                                                                key={labeler.id}>
                                                                <IonThumbnail
                                                                    className={'avatar'}
                                                                    slot="start">
                                                                    {isBestLabeler ? (
                                                                        <IonIcon
                                                                            icon={star}
                                                                            size={'custom'}
                                                                            style={{fontSize: '45px'}}
                                                                            color={'warning'}/>
                                                                    ) : (
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                             width="50" height="50"
                                                                             viewBox="0 0 100 100">
                                                                            <circle cx="50" cy="50" r="45"
                                                                                    fill="darkviolet"/>
                                                                            <text x="50%" y="50%" textAnchor="middle"
                                                                                  alignmentBaseline="central"
                                                                                  fontSize="30" fill="#ffffff">L
                                                                            </text>
                                                                        </svg>
                                                                    )}
                                                                </IonThumbnail>
                                                                <IonLabel
                                                                    className={'label-content'}
                                                                    style={{display: "flex"}}>
                                                                    <div>
                                                                        <h1
                                                                            id={'names'}>{labelerName}</h1>
                                                                        <p>{`${roundedPercentage} %`}</p>
                                                                    </div>
                                                                </IonLabel>
                                                            </IonItem>
                                                        );
                                                    })}
                                                </IonList>
                                            )}
                                        </form>
                                    </div>
                                </IonCard>
                            </div>
                        </div>
                    </div>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}
