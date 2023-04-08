import React, {useState} from 'react';
import './RegistrationSucceed.css';
import {
    IonAvatar,
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

function RegistrationSucceed() {
    const [presentAlert] = useIonAlert();
    const [labelText, setLabelText] = useState('');


    return (
        <>
            <IonPage>
                <IonContent>
                    <IonHeader class="ion-no-border">
                        <IonToolbar>
                            <IonTitle style={{fontSize: '3rem', fontWeight: 'bold', marginTop: '60px'}}
                                      className="ion-text-center">D-LAMA</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh'
                    }}>
                        <form style={{width: '80%', maxWidth: '400px'}}>
                            <div className={'custom-border'}>
                            <>
                                <IonAvatar className="item-avatar">
                                    <img alt="Silhouette of a person's head"
                                         src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
                                </IonAvatar>
                            </>
                            <IonItem style={{marginBottom: '15px'}}>
                                <IonLabel className="ion-text-center" color="success">Registration suceeded</IonLabel>
                            </IonItem>
                            <IonButton size="large" className="ion-text-center" expand="block" shape="round"
                                       color={'success'}
                                       onClick={() =>
                                           presentAlert({
                                               header: 'Attention!',
                                               message: 'Login not yet integrated!',
                                               buttons: ['OK'],
                                           })
                                       }
                            >LOGIN NOW
                            </IonButton>
                            </div>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}

export default RegistrationSucceed;