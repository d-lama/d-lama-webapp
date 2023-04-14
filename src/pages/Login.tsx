import React, {useState} from 'react';
import './Login.css';
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

export function Login() {
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
                                   helperText={"Enter a valid email"} errorText={"Invalid email"}
                                   inputType={InputType.email}/>
                            <Input inputName={"Password"} placeholder={"**************"}
                                   helperText={"Enter a valid password"} errorText={"error"}
                                   inputType={InputType.password}/>
                            <IonItem id="{{error}}" style={{marginBottom: '20px'}}>
                                {labelText &&
                                    <IonLabel className="ion-text-center" color="danger">{labelText}</IonLabel>}
                            </IonItem>
                            <Button buttonType={ButtonType.submit} buttonText={"Login"} color={"primary"}></Button>
                            <Button link={"/registration"} buttonText={"Sign Up"}
                                    buttonType={ButtonType.button}></Button>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}

export default Login;