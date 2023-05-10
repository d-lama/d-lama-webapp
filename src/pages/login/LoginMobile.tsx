import React from 'react';
import './Login.css';
import {IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {Input, InputType} from "../../components/forms/Input";
import {Button, ButtonType} from "../../components/forms/Button";

export default function LoginMobile(props: any) {
    return (
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
                    <form style={{width: '80%', maxWidth: '400px'}} onSubmit={props.handleLogin}>

                        <Input
                            name={"email"}
                            inputName={"Email"}
                            change={props.handleChange}
                            placeholder={"max.muster@gmail.com"}
                            helperText={"Enter a valid email"}
                            errorText={"Invalid email"}
                            inputType={InputType.email}/>
                        <Input
                            name={"password"}
                            inputName={"Password"}
                            change={props.handleChange}
                            placeholder={"**************"}
                            helperText={"Enter a valid password"}
                            errorText={"error"}
                            inputType={InputType.password}/>
                        <IonItem id="{{error}}" style={{marginBottom: '20px'}}>
                            {props.labelText &&
                                <IonLabel className="ion-text-center" color="danger">{props.labelText}</IonLabel>}
                        </IonItem>
                        <Button buttonType={ButtonType.submit} buttonText={"Login"} color={"primary"}></Button>
                        <Button link={"/registration"} buttonText={"Sign Up"}
                                buttonType={ButtonType.button}></Button>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
}
