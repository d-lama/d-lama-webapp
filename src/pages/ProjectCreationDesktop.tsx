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
import DynamicField from "../components/forms/DynamicField";


export default function ProjectCreationDesktop() {
    const [labelText, setLabelText] = useState('');
    const [mask, setMask] = useState({
        projectName: "",
        projectType: "",
        uploadData: ""
    })


    function handleChange(e: { target: { name: any; value: any; }; }) {
        setMask(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const [selectedFile, setSelectedFile] = useState<File | null>(null);


    function handleFileUpload(e: React.SyntheticEvent) {
        const formData = new FormData();
        e.preventDefault()
        axios.post('/api/register', {
            formData: formData,
            projectName: mask.projectName,
            projectType: mask.projectType,
            uploadData: mask.uploadData

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
                              onSubmit={handleFileUpload}>
                            <Input
                                name={"projectName"}
                                change={handleChange}
                                inputName={"Enter Project Name"}
                                placeholder={"D-LAMA Test Project"}
                                helperText={"Enter a valid name"}
                                errorText={"Invalid text"}
                                inputType={InputType.text}/>
                            <Input
                                name={"projectType"}
                                change={handleChange}
                                inputName={"Enter Project Type"}
                                placeholder={"Text"}
                                helperText={"Enter a valid type"}
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
                            <DynamicField/>
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
