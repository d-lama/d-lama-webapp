import React from 'react';
import './RegistrationSucceed.css';
import {
    IonAvatar,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {Button, ButtonType} from "../../../components/forms/Button";


function RegistrationSucceed() {

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
                        <div className={'custom-border'}>
                            <>
                                <IonAvatar className="item-avatar">
                                    <svg width="240" height="217" viewBox="-20 0 250 215" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <ellipse cx="115" cy="108.5" rx="115" ry="108.5" fill="#D9D9D9"/>
                                        <line x1="62.6537" y1="116.535" x2="108.654" y2="157.535" stroke="#2dd36f"
                                              strokeWidth="20"/>
                                        <line x1="103.474" y1="148.415" x2="173.474" y2="68.415" stroke="#2dd36f"
                                              strokeWidth="20"/>
                                    </svg>
                                </IonAvatar>
                            </>
                            <IonItem style={{marginBottom: '15px'}}>
                                <IonLabel className="ion-text-center" color="success">Registration succeeded</IonLabel>
                            </IonItem>
                            <Button link={"/login"} buttonText={"LOGIN NOW"} buttonType={ButtonType.button}
                                    color={"success"}></Button>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}

export default RegistrationSucceed;