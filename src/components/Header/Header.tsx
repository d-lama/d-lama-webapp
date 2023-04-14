import {
    IonHeader,
    IonTitle,
    IonToolbar
} from '@ionic/react'

import './Header.css'

export const Header: React.FC = () => {
    return (
        // TODO: find out when to use md and when ios
        // or why it buges sometimes
        // mode={"md"}
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonTitle className="title ion-text-center">D-LAMA</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};
