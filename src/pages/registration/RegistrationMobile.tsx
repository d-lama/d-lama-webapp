import React from 'react';
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {Input, InputType} from "../../components/forms/Input";
import {Button, ButtonType} from "../../components/forms/Button";
import RegistrationForm from "./RegistrationForm";

export default function RegistrationMobile(props: any) {

    const formStyle = {width: '80%', maxWidth: '400px'};

    return (
        <>
            <IonPage>
                {props.isSettings ? "" :
                <IonHeader class="ion-no-border" mode={"md"}>
                    <IonToolbar>
                        <IonTitle style={{fontSize: '3rem', fontWeight: 'bold', marginTop: '60px'}}
                                  className="ion-text-center">D-LAMA</IonTitle>
                    </IonToolbar>
                </IonHeader>
                }
                <IonContent class={"ion-padding"}>
                    <RegistrationForm props={props} formStyle={formStyle} />
                </IonContent>
            </IonPage>
        </>

    );
}