import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { play } from 'ionicons/icons';
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
        <IonButton className='btn'>
            <div className='progressBar' style={progressBarStyle}></div>
            <span className='title'>{title}</span>
            <IonIcon icon={play} className='icon' />
        </IonButton>
    );
};
