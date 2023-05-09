import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage, IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {Input, InputType} from "../components/forms/Input";
import {Button, ButtonType} from "../components/forms/Button";
import axios from "axios";
import './ProjectCreationDesktop.css';


export default function ProjectCreationDesktop() {
    const [labelText, setLabelText] = useState('');
    const [selection, setSelection] = useState(null);
    const [mask, setMask] = useState({
        projectName: "",
        projectType: "",
        addLabel: "",
        uploadData: ""
    })

    function clearSelection() {
        setSelection(null);
    }

    function handleChange(e: { target: { name: any; value: any; }; }) {
        setMask(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const [, setSelectedFile] = useState(null);

    function handleFileInputChange(event: any) {
        setSelectedFile(event.target.files[0]);
    }

    function handleFileUpload(e: React.SyntheticEvent) {
        const formData = new FormData();

        // Hier können Sie die FormData an Ihren API-Endpunkt senden
        // z.B. mit fetch oder axios
        e.preventDefault()
        axios.post('/api/register', {
            formData: formData,
            projectName: mask.projectName,
            projectType: mask.projectType,
            addLabel: mask.addLabel,
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
                            <IonList>
                                <IonItem fill="outline" style={{marginTop: '15px', position: 'center'}} shape='round'
                                         mode={"md"}>
                                    <IonSelect
                                        value={selection}
                                        onIonChange={(e) => setSelection(e.detail.value)}
                                        placeholder="add needed label"
                                        multiple={true}
                                        onIonCancel={clearSelection}
                                    >
                                        <IonSelectOption value="positive">positive</IonSelectOption>
                                        <IonSelectOption value="negative">negative</IonSelectOption>
                                        <IonSelectOption value="neutral">neutral</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                            <IonItem fill="outline" style={{marginTop: '15px', marginBottom: '15px'}} shape='round'
                                     mode={"md"}>
                                <input className="file-upload" type="file" onChange={handleFileInputChange}
                                       placeholder={"Choose file"}/>
                            </IonItem>
                            {labelText &&
                                <IonItem id="{{error}}" style={{marginBottom: '15px'}}>
                                    <IonLabel className="ion-text-center" color="danger">{labelText}</IonLabel>
                                </IonItem>}
                            <Button data-testid="register-button" buttonText={"Create"} buttonType={ButtonType.submit}
                                    color={"secondary"}></Button>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}
