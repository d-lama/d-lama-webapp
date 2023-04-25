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
import axios from "axios";

export default function Login() {
    const [labelText, setLabelText] = useState('');
    const [mask, setMask] = useState({
        email: "",
        password: "",
    })

    function handleChange(e: { target: { name: any; value: any; }; }) {
        console.log(e.target.value)
        setMask(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleLogin = function (e:React.SyntheticEvent) {
        e.preventDefault()
        //TODO: insert correct URL
        axios.post('/api/login', {
            email: mask.email,
            password: mask.password,
        })
            .then(function () {
                window.location.href = '/home';
            })
            .catch(function (error) {
                console.log(error);
                setLabelText('Invalid email or password!');
                setTimeout(() => {
                    setLabelText('');
                }, 3000);
            });
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
                            <Input
                                name={"email"}
                                inputName={"Email"}
                                change={handleChange}
                                placeholder={"max.muster@gmail.com"}
                                helperText={"Enter a valid email"}
                                errorText={"Invalid email"}
                                inputType={InputType.email}/>
                            <Input
                                name={"password"}
                                inputName={"Password"}
                                change={handleChange}
                                placeholder={"**************"}
                                helperText={"Enter a valid password"}
                                errorText={"error"}
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

