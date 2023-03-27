import React from 'react';
import './Login.css';
import {
    IonButton, IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonAlert
} from '@ionic/react';

function Login() {
    const [presentAlert] = useIonAlert();
    const handleLogin = () => {
        // Handle user authentication logic here
    };
    return (
        <>
            <IonPage>
                <IonContent>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle style={{fontSize: '2rem'}} className="ion-text-center">D-LAMA</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh'
                    }}>
                        <form style={{width: '80%', maxWidth: '400px'}} onSubmit={handleLogin}>
                            <IonItem fill="outline" style={{marginBottom: '30px'}}>
                                <IonLabel className="centered" position="floating">Enter Email</IonLabel>
                                <IonInput className="ion-text-center" type="email"
                                          placeholder="max.muster@gmail.com"></IonInput>
                            </IonItem>

                            <IonItem fill="outline" style={{marginBottom: '70px'}}>
                                <IonLabel className="centered" position="floating">Enter Password</IonLabel>
                                <IonInput className="ion-text-center" type="password"
                                          placeholder="**************"></IonInput>
                            </IonItem>
                            <>
                                <IonButton size="large" className="ion-text-center" expand="block"
                                           style={{marginBottom: '30px'}}
                                           onClick={() =>
                                               presentAlert({
                                                   header: 'Attention!',
                                                   message: 'Wrong email or password!',
                                                   buttons: ['OK'],
                                               })
                                           }
                                >Login
                                </IonButton>
                                <IonButton size="large" className="ion-text-center" expand="block"
                                           onClick={() =>
                                               handleLogin()
                                           }
                                >Sign Up
                                </IonButton>
                            </>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}

export default Login;