import React, {useState} from 'react';
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


function Registration() {
    const [labelText, setLabelText] = useState('');
    const [mask, setMask] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    function handleChange(e: { target: { name: any; value: any; }; }) {
        console.log(e.target.value)
        setMask(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = function () {
        axios.post('/api/register', {
            fistname: mask.firstName,
            lastname: mask.lastName,
            email: mask.email,
            password: mask.password,

        })
            .then(function () {
                window.location.href = '/registrationSucceed';
            })
            .catch(function (error) {
                console.log(error);
                setLabelText('Invalid username or password!');
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
                <IonContent class={"ion-padding"}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh'
                    }}>
                        <form style={{width: '80%', maxWidth: '400px'}} data-testid="registration-form" onSubmit={handleSubmit}>
                            <Input
                                name={"firstName"}
                                change={handleChange}
                                inputName={"Enter First Name"}
                                placeholder={"Max"}
                                helperText={"Enter a valid name"}
                                errorText={"Invalid email"}
                                inputType={InputType.text}/>
                            <Input
                                name={"lastName"}
                                change={handleChange}
                                inputName={"Enter Last Name"}
                                placeholder={"Muster"}
                                helperText={"Enter a valid name"}
                                errorText={"Invalid email"}
                                inputType={InputType.text}/>
                            <Input
                                name={"email"}
                                change={handleChange}
                                inputName={"Enter Email"}
                                placeholder={"max.muster@gmail.com"}
                                helperText={"Enter a valid email"}
                                errorText={"Invalid password"}
                                inputType={InputType.email}/>
                            <Input
                                name={"password"}
                                change={handleChange}
                                inputName={"Enter Password"}
                                placeholder={"**************"}
                                helperText={"Enter a valid password"}
                                errorText={"Invalid password"}
                                inputType={InputType.password}/>
                            <Input
                                name={"password"}
                                change={handleChange}
                                inputName={"Confirm Password"}
                                placeholder={"**************"}
                                helperText={"Confirm the password"}
                                errorText={"Invalid password"}
                                inputType={InputType.password}/>
                            <IonItem id="{{error}}" style={{marginBottom: '15px'}}>
                                {labelText &&
                                    <IonLabel className="ion-text-center" color="danger">{labelText}</IonLabel>}
                            </IonItem>
                            <Button data-testid="register-button" buttonText={"Register"} buttonType={ButtonType.submit}  color={"primary"}></Button>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}

export default Registration;