import React from 'react'
import { IonButton, IonIcon } from '@ionic/react'
import { play } from 'ionicons/icons'
import './CustomButton.css'

interface CustomButtonProps {
    title: string;
    progress: number;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, progress }) => {
    const progressBarStyle: React.CSSProperties = {
        width: `${progress}%`
    };

    return (
        <IonButton className='customBtn-btn'>
            <div className='customBtn-progressBar' style={progressBarStyle}></div>
            <span className='customBtn-title'>{title}</span>
            <IonIcon icon={play} className='customBtn-icon' />
        </IonButton>
    );
};
