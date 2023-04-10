import React, { useEffect } from 'react';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
} from '@ionic/react';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';

import './CardLabelComponent.css';

interface Props {
    cardTitle: string;
    cardSubtitle: string;
    content: string;
    onSwipe: (direction: string) => void;
}

const CardLabelComponent: React.FC<Props> = ({
    cardTitle,
    cardSubtitle,
    content,
    onSwipe,
}) => {
    useEffect(() => {
        const gesture = initGesture();
        gesture.enable();
        return () => {
            gesture.destroy();
        };
    }, []);

    function initGesture(): Gesture {
        const el = document.querySelector('.labelingCard') as HTMLElement;
        const style = el.style;
        const windowHeight = window.innerHeight;
        const options: GestureConfig = {
            el,
            gestureName: 'card-swipe',
            direction: undefined, // allow swiping in both x and y directions
            onStart: () => {
                style.transition = 'none';
            },
            onMove: (ev) => {
                style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px) rotate(${
                    ev.deltaX / 20
                }deg)`;
            },
            onEnd: (ev) => {
                style.transition = '0.3s ease-out';
                if (ev.deltaY < -windowHeight / 6) {
                    style.transform = `translateY(-${windowHeight * 1.5}px)`;
                    onSwipe('up');
                } else if (ev.deltaY > windowHeight / 6) {
                    style.transform = `translateY(${windowHeight * 1.5}px)`;
                    onSwipe('down');
                } else if (ev.deltaX > window.innerWidth / 2) {
                    style.transform = `translateX(${window.innerWidth * 1.5}px)`;
                    onSwipe('right');
                } else if (ev.deltaX < -window.innerWidth / 2) {
                    style.transform = `translateX(-${window.innerWidth * 1.5}px)`;
                    onSwipe('left');
                } else {
                    style.transform = '';
                }
            },
        };
        return createGesture(options);
    }

    return (
        <IonCard className="labelingCard">
            <IonCardHeader>
                <IonCardTitle>{cardTitle}</IonCardTitle>
                <IonCardSubtitle>{cardSubtitle}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{content}</IonCardContent>
        </IonCard>
    );
};

export default CardLabelComponent;