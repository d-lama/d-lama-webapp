import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, {useRef, useState} from "react";

import {HeaderDesktop} from "../components/header/HeaderDesktop";
import {Input, InputType} from "../components/forms/Input";
import {Button, ButtonType} from "../components/forms/Button";
import "./ProjectOverviewDesktop.css"
import {DynamicField, ElementData} from "../components/forms/DynamicField";
import {useAuthStore} from "../store/authStore";
import axios from "axios";
import {API_URL} from "../App";
import {useParams} from "react-router";

interface RouteParams {
    projectId: string;
}


export default function ProjectOverviewDesktop(props: any) {
    const { token } = useAuthStore();
    const [labelIndex, setLabelIndex] = useState(0);
    const [labelText, setLabelText] = useState("");
    const [mask, setMask] = useState({
        projectName: "",
        description: "",
    });
    const [labels, setLabels] = useState<ElementData[]>([]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { projectId } = useParams<RouteParams>();

    function handleChange(e: { target: { name: any; value: any } }) {
        setMask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function addElement() {
        setLabels([...labels, { id: labelIndex, name: "", description: "" }]);
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
                { headers: { Authorization: `Bearer ${token}` } }
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
    return (
        <>
            <IonPage className="split-view">
                <HeaderDesktop />
                <IonContent>
                    <div className="box">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle class="ion-text-center">Project Details</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <div className="horizontal-flex-container">
                    <div className="panel left">
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
                                className={"custom-border"}
                                style={{ width: "80%", maxWidth: "600px" }}
                                onSubmit={handleProjectSubmit}
                            >
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
                                        style={{ display: "none" }}
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
                                    <IonItem id="{{error}}" style={{ marginBottom: "15px" }}>
                                        <IonLabel className="ion-text-center" color="danger">
                                            {labelText}
                                        </IonLabel>
                                    </IonItem>
                                )}
                                <Button
                                    toolTipText={"new screen for uploading file"}
                                    data-testid="create-button"
                                    buttonText={"Continue with fileupload"}
                                    buttonType={ButtonType.submit}
                                    color={"secondary"}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="panel right">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "80vh",
                        }}
                    >
                        <form
                            className={"custom-border"}
                            style={{ width: "80%" }}
                            data-testid="registration-form"
                            onSubmit={props.handleLogin}
                        >
                            <Input
                                name={"lastName"}
                                change={props.handleChange}
                                inputName={"Enter Last Name"}
                                placeholder={"Muster"}
                                helperText={"Enter a valid name"}
                                errorText={"Invalid email"}
                                inputType={InputType.text}
                            />
                            <Input
                                name={"firstName"}
                                change={props.handleChange}
                                inputName={"Enter First Name"}
                                placeholder={"Max"}
                                helperText={"Enter a valid name"}
                                errorText={"Invalid email"}
                                inputType={InputType.text}
                            />
                            <Input
                                name={"birthDate"}
                                change={props.handleChange}
                                inputName={"Birthdate"}
                                placeholder={""}
                                helperText={"Enter a valid birth date"}
                                errorText={"Invalid date"}
                                inputType={InputType.date}
                            />
                            <Input
                                name={"email"}
                                change={props.handleChange}
                                inputName={"Enter Email"}
                                placeholder={"max.muster@gmail.com"}
                                helperText={"Enter a valid email"}
                                errorText={"Invalid password"}
                                inputType={InputType.email}
                            />
                            <Input
                                name={"password"}
                                change={props.handleChange}
                                inputName={"Enter Password"}
                                placeholder={"**************"}
                                helperText={"Enter a valid password"}
                                errorText={"Invalid password"}
                                inputType={InputType.password}
                            />
                            <Input
                                name={"confirmPassword"}
                                change={props.handleChange}
                                inputName={"Confirm Password"}
                                placeholder={"**************"}
                                helperText={"Confirm the password"}
                                errorText={"Invalid password"}
                                inputType={InputType.password}
                            />
                            <IonSegment onIonChange={props.handleIsAdminChange}>
                                <IonSegmentButton value="labeler">
                                    <IonLabel>Labeler</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="admin">
                                    <IonLabel>Administrator</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                            {props.labelText && (
                                <IonItem id="{{error}}" style={{ marginBottom: "15px" }}>
                                    <IonLabel className="ion-text-center" color="danger">
                                        {props.labelText}
                                    </IonLabel>
                                </IonItem>
                            )}

                            <Button
                                data-testid="register-button"
                                buttonText={"Register"}
                                buttonType={ButtonType.submit}
                                color={"primary"}
                            ></Button>
                        </form>
                    </div>
                    </div>
                    </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
}
