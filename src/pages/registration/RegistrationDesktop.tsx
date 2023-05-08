import React from 'react';
import {IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {Input, InputType} from "../../components/forms/Input";
import {Button, ButtonType} from "../../components/forms/Button";
import './RegistrationDesktop.css'

export default function RegistrationDesktop(props: any) {
    return (
        <>
            <IonPage>
                <IonHeader mode={"md"}>
                    <IonToolbar>
                        <IonTitle style={{fontSize: '4rem', fontWeight: 'bold', marginTop: '20px', marginBottom:'20px'}}
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
                        <form className={'custom-border'} style={{width: '80%', maxWidth: '600px'}} data-testid="registration-form"
                              onSubmit={props.handleLogin}>
                            <Input
                                name={"firstName"}
                                change={props.handleChange}
                                inputName={"Enter First Name"}
                                placeholder={"Max"}
                                helperText={"Enter a valid name"}
                                errorText={"Invalid email"}
                                inputType={InputType.text}/>
                            <Input
                                name={"lastName"}
                                change={props.handleChange}
                                inputName={"Enter Last Name"}
                                placeholder={"Muster"}
                                helperText={"Enter a valid name"}
                                errorText={"Invalid email"}
                                inputType={InputType.text}/>
                            <Input
                                name={"email"}
                                change={props.handleChange}
                                inputName={"Enter Email"}
                                placeholder={"max.muster@gmail.com"}
                                helperText={"Enter a valid email"}
                                errorText={"Invalid password"}
                                inputType={InputType.email}/>
                            <Input
                                name={"password"}
                                change={props.handleChange}
                                inputName={"Enter Password"}
                                placeholder={"**************"}
                                helperText={"Enter a valid password"}
                                errorText={"Invalid password"}
                                inputType={InputType.password}/>
                            <Input
                                name={"confirmPassword"}
                                change={props.handleChange}
                                inputName={"Confirm Password"}
                                placeholder={"**************"}
                                helperText={"Confirm the password"}
                                errorText={"Invalid password"}
                                inputType={InputType.password}/>
                            <IonItem id="{{error}}" style={{marginBottom: '15px'}}>
                                {props.labelText &&
                                    <IonLabel className="ion-text-center" color="danger">{props.labelText}</IonLabel>}
                            </IonItem>
                            <Button data-testid="register-button" buttonText={"Register"} buttonType={ButtonType.submit}
                                    color={"success"}></Button>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}