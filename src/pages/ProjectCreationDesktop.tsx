import React, {useRef, useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {Input, InputType} from "../components/forms/Input";
import {Button, ButtonType} from "../components/forms/Button";
import axios from "axios";
import './ProjectCreationDesktop.css';
import {DynamicField} from "../components/forms/DynamicField";
import {ElementData} from "../components/forms/DynamicField"
import {API_URL} from "../App";


export default function ProjectCreationDesktop() {
    const [labelText, setLabelText] = useState('');
    const [mask, setMask] = useState({
        projectName: "",
        projectDescription: ""
    })


    function handleChange(e: { target: { name: any; value: any; }; }) {
        setMask(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [elements, setElements] = useState<ElementData[]>([]);

    const addElement = () => {
        setElements([...elements, { label: '' }]);
    };

    const removeElement = (index: number) => {
        const updatedElements = [...elements];
        updatedElements.splice(index, 1);
        setElements(updatedElements);
    };

    const handleLabelChange = (index: number, value: string) => {
        const updatedElements = [...elements];
        updatedElements[index].label = value;
        setElements(updatedElements);
    };

    const handleProjectSubmit = function(e: React.SyntheticEvent) {
        e.preventDefault()
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post(API_URL + "/Datapoint{projectId}/UploadTextDataPoints", formData)
                .then(function () {
                    window.location.href = '/home';
                })
                .catch(function () {
                    setLabelText('Error in fileUpload!');
                    setTimeout(() => {
                        setLabelText('');
                    }, 3000);
                })
        }

        axios.post(API_URL + "/Project", {
            projectName: mask.projectName,
            projectDescription: mask.projectDescription,
            elements
        })
            .then(function () {
                window.location.href = '/home';
            })
            .catch(function () {
                setLabelText('Connection failed!');
                setTimeout(() => {
                    setLabelText('');
                }, 3000);
            });
    }

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file|| null);
    };

    return (
        <>
            <IonPage>
                <IonHeader mode={"md"}>
                    <IonToolbar>
                        <IonTitle
                            style={{fontSize: '4rem', fontWeight: 'bold', marginTop: '20px', marginBottom: '20px'}}
                            className="ion-text-center">D-LAMA</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent class={"ion-padding"}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh'
                    }}>
                        <form className={'custom-border'} style={{width: '80%', maxWidth: '600px'}}
                              onSubmit={handleProjectSubmit}>
                            <Input
                                name={"projectName"}
                                change={handleChange}
                                inputName={"Enter Project Name"}
                                placeholder={"D-LAMA Test Project"}
                                helperText={"Enter a valid name"}
                                errorText={"Invalid text"}
                                inputType={InputType.text}/>
                            <Input
                                name={"projectDescription"}
                                change={handleChange}
                                inputName={"Enter Project Description"}
                                placeholder={"Text"}
                                helperText={"Enter a valid description"}
                                errorText={"Invalid type"}
                                inputType={InputType.text}/>
                            <div>
                                <div className="file-input" onClick={handleClick}>
                                    {selectedFile ? (
                                        <p>{selectedFile.name}</p>
                                    ) : (
                                        <p>Select file</p>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept=".csv"
                                    style={{ display: 'none'}}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <DynamicField elements={elements} onLabelChange={handleLabelChange} addElement={addElement} removeElement={removeElement} />
                            {labelText &&
                                <IonItem id="{{error}}" style={{marginBottom: '15px'}}>
                                    <IonLabel className="ion-text-center" color="danger">{labelText}</IonLabel>
                                </IonItem>}
                            <Button data-testid="create-button" buttonText={"Create"} buttonType={ButtonType.submit}
                                    color={"secondary"}></Button>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}
