import React, {useState} from 'react';
import './Login.css';
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

function Login() {
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
                            <IonItem fill="outline" style={{marginBottom: '30px'}} shape='round'>
                                <IonLabel className="ion-text-center" position="floating">Email</IonLabel>
                                <IonInput className="ion-text-center" type="email"
                                          placeholder="max.muster@gmail.com"></IonInput>
                                <IonNote slot="helper">Enter a valid email</IonNote>
                                <IonNote slot="error">Invalid email</IonNote>
                            </IonItem>

                            <IonItem fill="outline" style={{marginBottom: '20px'}} shape='round'>
                                <IonLabel className="ion-text-center" position="floating">Password</IonLabel>
                                <IonInput className="ion-text-center" type="password"
                                          placeholder="**************"></IonInput>
                                <IonNote slot="helper">Enter a valid password</IonNote>
                                <IonNote slot="error">Invalid password</IonNote>
                            </IonItem>


                            <IonItem  id="{{error}}" style={{marginBottom: '20px'}}>
                                {labelText && <IonLabel className="ion-text-center"color="danger">{labelText}</IonLabel>}
                            </IonItem>


                                <IonButton type={"submit"} size="large" className="ion-text-center" expand="block" shape="round"
                                           style={{marginBottom: '30px'}}
                                >Login
                                </IonButton>
                                <IonButton size="large" className="ion-text-center" expand="block" shape="round"
                                           onClick={() =>
                                               presentAlert({
                                                   header: 'Attention!',
                                                   message: 'Registration page not yet implemented!',
                                                   buttons: ['OK'],
                                               })
                                           }
                                >Sign Up
                                </IonButton>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}

export default Login;