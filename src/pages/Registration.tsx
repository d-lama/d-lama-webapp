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
                            <Input inputName={"Enter Last Name"} placeholder={"Muster"} helperText={"Enter a valid name"} errorText={"Invalid email"}/>
                            <Input inputName={"Enter Email"} placeholder={"max.muster@gmail.com"} helperText={"Enter a valid email"} errorText={"Invalid password"}/>
                            <Input inputName={"Enter Password"} placeholder={"**************"} helperText={"Enter a valid password"} errorText={"Invalid password"}/>
                            <Input inputName={"Confirm Password"} placeholder={"**************"} helperText={"Confirm the password"} errorText={"Invalid password"}/>
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