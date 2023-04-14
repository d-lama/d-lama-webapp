import React from 'react'
import { IonButton, IonIcon } from '@ionic/react'
import { play } from 'ionicons/icons'
import './CustomButton.css'

interface ICustomButtonProps {
    title: string,
    progress: number
}

export const CustomButton: React.FC<ICustomButtonProps> = ({ title, progress }) => {
    const progressBarStyle: React.CSSProperties = {
        width: `${progress}%`
    }

    return (
        <IonButton className='customBtn-btn' fill="outline">
            <div className='customBtn-progressBar' style={progressBarStyle}></div>
            <span className='customBtn-title'>{title}</span>
            <IonIcon icon={play} className='customBtn-icon' />
        </IonButton>
    )
}
