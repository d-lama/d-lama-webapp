import React, {useState} from 'react';
import './Registration.css';
import {
    IonButton, IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel, IonNote,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonAlert
} from '@ionic/react';
import {Input} from "../components/forms/Input";

function Registration() {
    const [presentAlert] = useIonAlert();
    const [labelText, setLabelText] = useState('');
    const handleSubmit = function (event: { preventDefault: () => void; }) {
        // Handle user authentication logic here
        event.preventDefault()
        setLabelText('Invalid username or password!');
        setTimeout(() => {
            setLabelText('');
        }, 3000);
    }

    return (
        <>
            <IonPage>
                <IonContent>
                    <IonHeader class="ion-no-border">
                        <IonToolbar>
                            <IonTitle style={{fontSize: '3rem',fontWeight:'bold', marginTop:'60px'}} className="ion-text-center">D-LAMA</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh'
                    }}>
                        <form style={{width: '80%', maxWidth: '400px'}} onSubmit={handleSubmit}>
                            <Input inputName={"Enter First Name"} placeholder={"Max"} helperText={"Enter a valid name"} errorText={"Invalid email"}/>

                            <IonItem fill="outline" style={{marginBottom: '15px'}} shape='round'>
                                <IonLabel className="ion-text-center" position="floating">Enter Last Name</IonLabel>
                                <IonInput className="ion-text-center" type="text"
                                          placeholder="Muster"></IonInput>
                                <IonNote slot="helper">Enter a valid name</IonNote>
                                <IonNote slot="error">Invalid email</IonNote>
                            </IonItem>

                            <IonItem fill="outline" style={{marginBottom: '15px'}} shape='round'>
                                <IonLabel className="ion-text-center" position="floating">Enter Email</IonLabel>
                                <IonInput className="ion-text-center" type="email"
                                          placeholder="max.muster@gmail.com"></IonInput>
                                <IonNote slot="helper">Enter a valid email</IonNote>
                                <IonNote slot="error">Invalid password</IonNote>
                            </IonItem>

                            <IonItem fill="outline" style={{marginBottom: '15px'}} shape='round'>
                                <IonLabel className="ion-text-center" position="floating">Enter Password</IonLabel>
                                <IonInput className="ion-text-center" type="password"
                                          placeholder="**************"></IonInput>
                                <IonNote slot="helper">Enter a valid password</IonNote>
                                <IonNote slot="error">Invalid password</IonNote>
                            </IonItem>

                            <IonItem fill="outline" style={{marginBottom: '15px'}} shape='round'>
                                <IonLabel className="ion-text-center" position="floating">Confirm Password</IonLabel>
                                <IonInput className="ion-text-center" type="password"
                                          placeholder="**************"></IonInput>
                                <IonNote slot="helper">Confirm the password</IonNote>
                                <IonNote slot="error">Invalid password</IonNote>
                            </IonItem>


                            <IonItem  id="{{error}}" style={{marginBottom: '15px'}}>
                                {labelText && <IonLabel className="ion-text-center"color="danger">{labelText}</IonLabel>}
                            </IonItem>


                            <IonButton size="large" className="ion-text-center" expand="block" shape="round"
                                       onClick={() =>
                                           presentAlert({
                                               header: 'Attention!',
                                               message: 'Registration verification not yet implemented!',
                                               buttons: ['OK'],
                                           })
                                       }
                            >Register
                            </IonButton>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}

export default Registration;