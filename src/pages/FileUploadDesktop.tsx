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
//import {Input, InputType} from "../components/forms/Input";
import {Button, ButtonType} from "../components/forms/Button";
import axios from "axios";
import './ProjectCreationDesktop.css';
//import {DynamicField} from "../components/forms/DynamicField";
//import {ElementData} from "../components/forms/DynamicField"
import {API_URL} from "../App";


export default function FileUploadDesktop() {
    const [labelText, setLabelText] = useState('');
/*
    const [mask, setMask] = useState({
        projectName: "",
        projectDescription: ""
    })


    function handleChange(e: { target: { name: any; value: any; }; }) {
        setMask(prev => ({...prev, [e.target.name]: e.target.value}))
    }
*/

    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const handleFileSubmit = function(e: React.SyntheticEvent) {
        e.preventDefault()
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post(API_URL + `/Datapoint{projectId}/UploadTextDataPoints`, formData)
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

    }

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = () => {
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
                            className="ion-text-center">D-LAMA
                        </IonTitle>
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
                        <form className={'custom-border'} style={{width: '80%', maxWidth: '500px'}}
                              onSubmit={handleFileSubmit}>
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
                                    accept=".csv"
                                    style={{ display: 'none'}}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>
                            {labelText &&
                                <IonItem
                                    id="{{error}}"
                                    style={{marginBottom: '15px'}}>
                                    <IonLabel
                                        className="ion-text-center"
                                        color="danger">{labelText}
                                    </IonLabel>
                                </IonItem>}
                            <Button
                                toolTipText={'When pressed file will be uploaded to the corresponding project'}
                                data-testid="create-button"
                                buttonText={"Create Project"}
                                buttonType={ButtonType.submit}
                                color={"secondary"}/>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}
