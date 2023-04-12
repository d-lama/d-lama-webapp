import React, {useState} from 'react';
import './Login.css';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonAlert
} from '@ionic/react';
import {Input, InputType} from "../components/forms/Input";
import {Button, ButtonType} from "../components/forms/Button";

function Login() {
    const [presentAlert] = useIonAlert();
    const [labelText, setLabelText] = useState('');
    const handleLogin = function (event: { preventDefault: () => void; }) {
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
                <IonHeader class="ion-no-border" mode={"md"}>
                    <IonToolbar>
                        <IonTitle style={{fontSize: '3rem', fontWeight: 'bold', marginTop: '60px'}}
                                  className="ion-text-center">D-LAMA</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh'
                    }}>
                        <form style={{width: '80%', maxWidth: '400px'}} onSubmit={handleLogin}>
                            <Input inputName={"Email"} placeholder={"max.muster@gmail.com"}
                                   helperText={"Enter a valid email"} errorText={"Invalid email"} inputType={InputType.email}/>
                            <Input inputName={"Password"} placeholder={"**************"}
                                   helperText={"Enter a valid password"} errorText={"error"} inputType={InputType.password}/>
                            <IonItem id="{{error}}" style={{marginBottom: '20px'}}>
                                {labelText &&
                                    <IonLabel className="ion-text-center" color="danger">{labelText}</IonLabel>}
                            </IonItem>
                            <Button buttonType={ButtonType.submit} buttonText={"Login"}></Button>
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